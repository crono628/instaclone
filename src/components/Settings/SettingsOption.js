import React from 'react';

const SettingsOption = ({ boolVal, message }) => {
  return (
    <div
      className={
        boolVal
          ? ' w-fit rounded-lg  hover:bg-slate-300'
          : 'bg-red-200 w-fit rounded-lg  hover:bg-red-300'
      }
    >
      <div className="cursor-pointer my-5 p-2">{message}</div>
    </div>
  );
};

export default SettingsOption;
