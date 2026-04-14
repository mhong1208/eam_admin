export const filterMenuItems = (items: any[], searchValue: string): any[] => {
  if (!searchValue) return items;
  
  const search = searchValue.toLowerCase();
  
  return items.reduce((acc: any[], item: any) => {
    if (!item) return acc;

    // Check if current item matches
    const label = typeof item.label === 'string' ? item.label : '';
    const isMatch = label.toLowerCase().includes(search);

    // If item has children, filter them recursively
    if (item.children && Array.isArray(item.children)) {
      const filteredChildren = filterMenuItems(item.children, searchValue);
      
      if (filteredChildren.length > 0) {
        // If any children match, keep this item and its filtered children
        acc.push({ ...item, children: filteredChildren });
      } else if (isMatch) {
        // If current item matches but children don't, keep this item with empty/no children
        // In search context, we usually don't want to show the whole branch if only parent matches
        // but for Ant Design Menu, we might want to keep the structure.
        // Let's just keep the item without children if they don't match.
        const { children, ...rest } = item;
        acc.push(rest);
      }
    } else if (isMatch) {
      // If item has no children and matches
      acc.push(item);
    }
    
    return acc;
  }, []);
};
