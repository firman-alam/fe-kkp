import React from 'react';

const SidebarList = ({ Icon, title }) => {
  return (
    <div className='sidebar__list'>
      {Icon && <Icon style={{ padding: 5 }} />}
      {Icon ? (
        <span>{title}</span>
      ) : (
        <>
          <span>#</span> {title}
        </>
      )}
    </div>
  );
};

export default SidebarList;
