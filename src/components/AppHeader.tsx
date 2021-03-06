import React from 'react'
import { AppState, useMessageContext } from '../context/MessageContext'

export const AppHeader: React.FC = ({ children }) => {
  const messageContext = useMessageContext()
  return (
    <>
      <header className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-transparent ">
        <div className="container px-4 mx-auto flex flex-row items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <button
              className="leading-relaxed inline-block mr-4 py-2 whitespace-nowrap"
              onClick={() => {
                messageContext.setAppState(AppState.welcome)
                messageContext.setBackground('outside_bakery_scene.webm')
                messageContext.setBackgroundColor('#ffd4a4')
                messageContext.setBackgroundColor2('#ffd4a4')
              }}
            >
              <svg
                className="w-8 h-8"
                fill="white"
                viewBox="0 0 500 500"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M109.041.545a107.124 107.124 0 0 1 106.91 100.365c.141 2.243.213 14.235.213 16.496v5.167L166.349 99.32l-10.931-5.167c-2.141-8.24-6.168-14.449-12.291-20.572a48.207 48.207 0 0 0-82.292 34.087l-.884 35.177s.527 4.007.958 6.559c.707 4.188 1.248 6.526 2.2 10.637l.022.095c.92 3.98 1.262 6.559 1.262 6.559L9.937 189.749l-1.461-5.764c-1.03-3.776-2.193-8.943-3.18-13.713-1.193-5.763-2.584-12.123-2.782-18.682-.772-6.525-.398-13.316-.597-19.676v-13.117c0-2.981.662-23.094.831-24.445.53-4.229 1.31-8.41 2.331-12.521a107.27 107.27 0 0 1 8.851-23.452A107.104 107.104 0 0 1 33.293 31.92 107.126 107.126 0 0 1 109.041.545ZM357.272 107.668A107.123 107.123 0 0 0 250.149.545c-27.467 0-41.389 1.163-60.547 19.477 6.161 5.167 16.158 18.011 18.483 21.265 1.156 1.618 8.546 15.393 9.142 17.291 2.385 5.366 4.373 9.738 4.373 9.738 9.142-7.552 15.764-8.854 28.549-8.854a48.205 48.205 0 0 1 48.205 48.206v39.749l-.507 3.577s-.924 4.468-1.391 7.353c-.128.795-.128.994-.327 1.59l53.661 25.042.526-1.59 1.59-5.565.994-4.173 1.391-5.366 2.186-12.72.596-4.571.199-3.577v-39.749Z"
                  fillRule="nonzero"
                  transform="matrix(.94957 0 0 .9577 79.18 101.3)"
                />
                <path
                  d="M1464.44 2156.77c106.1 8.65 170.92-5.97 273.19-37.98 103.25-32.32 199.05-84.41 281.92-153.3a821.77 821.77 0 0 0 35.42-31.21l12.79-12.19c4.12-4.03 17.46-18.93 21.5-23.04 6.78 4.07 298.12 149.07 304.9 151.77 6.77 2.71 28.45 10.84 47.43 14.91 20.32 4.35 24.39 5.42 32.52 5.42-86.73 116.54-73.78 94.52-196.86 196.83-123.09 102.32-265.38 179.7-418.72 227.7-153.15 47.93-255.54 68.74-415.44 55.23v.03c-220.3-10-432.29-78.46-614.526-196.26a1222.626 1222.626 0 0 1-128.733-95.73 1226.637 1226.637 0 0 1-49.724-44.71 1218.438 1218.438 0 0 1-74.944-77.83c-21.247-24.12-26.981-31.44-27.852-32.57-.186-.07-.127-.17-.127-.17l.127.17c.689.26 4.762.12 27.852-6.94 22.159-6.78 28.934-9.49 64.167-24.4 36.587-17.61 185.646-85.59 212.748-97.56 44.642-22.31 59.573-25.73 83.891-37.88-.348-.43.124-.06.124-.06l-.124.06c.483.59 2.54 2.71 9.61 9.42 144.261 137.08 318.931 200.91 518.881 210l-.02.29Z"
                  fillRule="nonzero"
                  transform="matrix(.13927 0 0 .14046 41.097 39.31)"
                />
                <path
                  d="m136.537 149.205 40.345 20.272-130.193 59.63c-16.541 7.576-36.096.383-43.785-16.106a6.62 6.62 0 0 1 3.428-8.898l130.205-54.898ZM143.095 139.363l9.869-33.027 201.157 93.801a6.486 6.486 0 0 1 3.138 8.62c-7.706 16.524-27.514 23.452-43.839 15.332l-170.325-84.726Z"
                  fillRule="nonzero"
                  transform="matrix(.94957 0 0 .9577 79.18 101.3)"
                />
                <g>
                  <path
                    d="M250 20.136H60s-.364 35-32.364 35V250"
                    fill="none"
                    stroke="white"
                    strokeWidth="18px"
                    transform="matrix(.98937 0 0 1.00059 2.658 -.148)"
                  />
                </g>
                <g>
                  <path
                    d="M250 20.136H60s-.364 35-32.364 35V250"
                    fill="none"
                    stroke="white"
                    strokeWidth="18px"
                    transform="matrix(-.98937 0 0 1.00059 497.342 -.148)"
                  />
                </g>
                <g>
                  <path
                    d="M250 20.136H60s-.364 35-32.364 35V250"
                    fill="none"
                    stroke="white"
                    strokeWidth="18px"
                    transform="matrix(.98937 0 0 -1.00059 2.658 500.148)"
                  />
                </g>
                <g>
                  <path
                    d="M250 20.136H60s-.364 35-32.364 35V250"
                    fill="none"
                    stroke="white"
                    strokeWidth="18px"
                    transform="matrix(-.98937 0 0 -1.00059 497.342 500.148)"
                  />
                </g>
              </svg>
            </button>
          </div>
          <div className="flex flex-row justify-end">
            <span className="text-lg sm:text-center text-white">
              <a
                href="https://www.notion.so/pretzeldao/The-Bakery-FAQ-9324e4ace9a948b681ec994b50d133a4"
              >
                FAQ
              </a>
            </span>
          </div>
        </div>
      </header>
    </>
  )
}
