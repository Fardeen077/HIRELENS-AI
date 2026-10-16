import React from 'react'
import useAuthStore from '../store/useAuthStore'

function Settings() {
    const user = useAuthStore((s)=> s.authUser)
    return (
        <div className='text-white'>
            <h1>{user?.username}</h1>
        </div>
    )
}

export default Settings
