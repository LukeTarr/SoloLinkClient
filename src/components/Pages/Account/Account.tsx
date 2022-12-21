import React, { useState } from 'react'
import UsernameModal from '../../Modals/UsernameModal';

const Account = () => {

    const [showUsernameModal, setShowUsernameModal] = useState(false);

  return (
    <div className="flex items-center justify-center mt-20">
      {showUsernameModal && (
        <UsernameModal
          hideSelf={() => {
            setShowUsernameModal(false);
          }}
        />
      )}
      <div className="flex flex-col items-center justify-center w-4/5 bg-gray-400 p-4 rounded-3xl shadow-2xl">
        <h2 className="text-3xl mb-10">Account</h2>

        <div className="w-full flex flex-row justify-center items-center">
          <button
            id="login"
            className="mx-4 mt-10 w-40 h-10 rounded bg-yellow-500 hover:bg-yellow-400"
            onClick={() => {setShowUsernameModal(true);}}
          >
            Username
          </button>
          <button
            id="login"
            className="mx-4 mt-10 w-40 h-10 rounded bg-yellow-500 hover:bg-yellow-400"
            onClick={() => {
                
            }}
          >
            Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default Account