import React, { useState, useMemo, useCallback, useRef } from 'react';
import { Select, Spin } from 'antd';
import type { SelectProps } from 'antd';
import { useLocationLoadAll } from '@/hooks/useLocations';
import type { Location } from '@/hooks/useLocations';

const PAGE_SIZE = 20;

export interface LocationSelectProps
    extends Omit<SelectProps, 'options' | 'loading' | 'filterOption' | 'onSearch'> {
    onChange?: (value: any, option: any) => void;
}

const LocationSelect: React.FC<LocationSelectProps> = ({ onChange, ...rest }) => {
    const { data: allLocations = [], isLoading } = useLocationLoadAll();

    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const filtered = useMemo(() => {
        if (!searchText.trim()) return allLocations;
        const lower = searchText.toLowerCase();
        return allLocations.filter(
            (d) =>
                d.name.toLowerCase().includes(lower) ||
                d.code.toLowerCase().includes(lower),
        );
    }, [allLocations, searchText]);

    const visible = useMemo(() => filtered.slice(0, page * PAGE_SIZE), [filtered, page]);
    const hasMore = visible.length < filtered.length;

    const options = useMemo(
        () =>
            visible.map((d: Location) => ({
                label: (
                    <span>
                        <span
                            style={{
                                fontFamily: 'monospace',
                                fontSize: 12,
                                color: 'var(--color-primary, #1677ff)',
                                marginRight: 6,
                                background: 'rgba(22,119,255,.08)',
                                padding: '1px 5px',
                                borderRadius: 4,
                            }}
                        >
                            {d.code}
                        </span>
                        {d.name}
                    </span>
                ),
                value: d.id,
                title: `${d.code} ${d.name}`,
            })),
        [visible],
    );

    const handleSearch = useCallback((val: string) => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => {
            setSearchText(val);
            setPage(1);
        }, 250);
    }, []);

    const handlePopupScroll = useCallback(
        (e: React.UIEvent<HTMLDivElement>) => {
            const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
            if (scrollHeight - scrollTop - clientHeight < 30 && hasMore) {
                setPage((p) => p + 1);
            }
        },
        [hasMore],
    );

    const handleDropdownVisibleChange = (open: boolean) => {
        if (open) {
            setSearchText('');
            setPage(1);
        }
    };

    return (
        <Select
            showSearch
            allowClear
            placeholder="Chọn phòng ban..."
            loading={isLoading}
            options={options}
            onSearch={handleSearch}
            onPopupScroll={handlePopupScroll}
            onDropdownVisibleChange={handleDropdownVisibleChange}
            onChange={onChange}
            filterOption={false}
            notFoundContent={
                isLoading ? (
                    <Spin size="small" style={{ display: 'block', textAlign: 'center', padding: 8 }} />
                ) : (
                    <span style={{ color: '#aaa', padding: 8, display: 'block', textAlign: 'center' }}>
                        Không tìm thấy vị trí
                    </span>
                )
            }
            dropdownRender={(menu) => (
                <>
                    {menu}
                    {hasMore && (
                        <div
                            style={{
                                textAlign: 'center',
                                padding: '6px 0',
                                color: '#aaa',
                                fontSize: 12,
                                borderTop: '1px solid var(--color-border, #f0f0f0)',
                            }}
                        >
                            Cuộn xuống để tải thêm ({visible.length}/{filtered.length})
                        </div>
                    )}
                </>
            )}
            style={{ width: '100%' }}
            {...rest}
        />
    );
};

export default LocationSelect;
