import React from "react";

export const AppHeader: React.FC = () => {
    return(
    <>
        <header className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-transparent mb-3">
            <div className='container px-4 mx-auto flex flex-wrap items-center justify-between'>
                <div className='w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
                    <a 
                        className='leading-relaxed inline-block mr-4 py-2 whitespace-nowrap'
                        href='#home'
                    >
                        <img src="/icons/pretzeldao_logo.svg" width="30" height="30" alt=""></img>
                    </a>
                </div>
            </div>
        </header>
    </>
    )
}
  