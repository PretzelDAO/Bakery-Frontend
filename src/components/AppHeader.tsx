import React from "react";
import { AppState, useMessageContext } from '../context/MessageContext'

export const AppHeader: React.FC = ({children}) => {
    const messageContext = useMessageContext()
    return(
    <>
        <header className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-transparent mb-3">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                    <button
                        className="leading-relaxed inline-block mr-4 py-2 whitespace-nowrap"
                        onClick={() => messageContext.setAppState(AppState.welcome)}
                    >
                        <svg className="w-8 h-8" fill="white" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" stroke-miterlimit="2" stroke-linejoin="round" clip-rule="evenodd">
                            <path d="M816.869 510.903c5.666-24.134 8.662-49.284 8.662-75.128v-65.592c0-73.911-60.006-133.917-133.917-133.917-28.293 0-54.549 8.793-76.174 23.789-18.667-52.874-50.399-99.581-91.329-136.251 47.721-32.509 105.392-51.518 167.503-51.518 164.523 0 297.896 133.373 297.896 297.897v65.592c0 50.632-7.649 99.477-21.857 145.448l-27.799-12.971-122.985-57.349Z" transform="matrix(.95202 0 0 .95202 25.86 25.7)"/><path d="M272.855 674.56c58.731 55.288 137.797 89.174 224.716 89.174 94.134 0 179.058-39.746 238.897-103.36l131.775 61.447a100.864 100.864 0 0 0 23.97 7.708c-89.694 120.294-233.072 198.185-394.642 198.185-153.939 0-291.365-70.708-381.547-181.39a100.66 100.66 0 0 0 14.796-5.532l142.035-66.232Zm-239.41-75.316C15.429 548.086 5.632 493.074 5.632 435.775v-65.592c0-164.524 133.373-297.897 297.897-297.897 164.523 0 297.896 133.373 297.896 297.897v40.257l-169.723-79.143c-16.672-54.968-67.781-95.031-128.173-95.031-73.911 0-133.917 60.006-133.917 133.917v65.592c0 32.526 4.746 63.954 13.583 93.632L59.209 587.222l-25.764 12.022Z" transform="matrix(.95202 0 0 .95202 25.86 25.7)"/><path d="m358.202 483.985 122.87 57.295L116.96 711.069c-33.549 15.644-74.524 2.14-102.043-30.322a26.222 26.222 0 0 1 8.855-40.8c21.926-10.239 49.297-23.002 49.297-23.002l285.133-132.96Z" transform="matrix(.95202 0 0 .95202 25.86 25.7)"/><path d="M212.855 527.5H822c41.83 0 77.346-27.036 90.027-64.586 2.476-7.223.639-14.966-4.965-20.932-5.604-5.967-14.33-9.47-23.589-9.47C856.127 432.5 822 432.5 822 432.5H212.855v95Z" transform="matrix(.76355 .35605 -.43984 .94324 470.026 -105.635)"/>
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    </>
    )
}
  