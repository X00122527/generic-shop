import React from 'react'
import AppPaths from '../../lib/appPaths'

function Footer() {
    return (
        <footer className="mt-12 font-normal bg-yellow-200">
            <div className="max-w-screen-xl p-4 py-6 mx-auto w-fit lg:py-8">
                <div className="grid grid-cols-2 grid-rows-3 mx-auto md:grid-cols-4 md:grid-rows-1 gap-x-8">

                    <div className="col-span-1 mt-4">
                        <h1 className="text-xl font-semibold uppercase">Header 1</h1>
                        <hr className="w-32 my-2 border-t-1 border-t-pastel-yellow" />
                        <p><a href={AppPaths.TEMP}>Link 1</a></p>
                        <p><a href={AppPaths.TEMP}>Link 2</a></p>
                        <p><a href={AppPaths.TEMP}>Link 3</a></p>
                    </div>

                    <div className="col-span-1 mt-4">
                        <h1 className="text-xl font-semibold uppercase">Header 2</h1>
                        <hr className="w-32 my-2 border-t-1 border-t-pastel-yellow" />
                        <p> <a href={AppPaths.TEMP}>Link 1</a></p>
                        <p> <a href={AppPaths.TEMP}>Link 2</a></p>
                        <p> <a href={AppPaths.TEMP}>Link 3</a></p>
                    </div>



                    <div className="col-span-1 mt-4">
                        <h1 className="text-xl font-semibold uppercase">Header 3</h1>
                        <hr className="w-32 my-2 border-t-1 border-t-pastel-yellow" />
                        <p><a href={AppPaths.TEMP}>Link 1</a></p>
                        <p><a href={AppPaths.TEMP}>Link 2</a></p>
                        <p><a href={AppPaths.TEMP}>Link 3</a></p>
                    </div>

                    <div className="col-span-1 mt-4">
                        <h1 className="text-xl font-semibold uppercase">Header 4</h1>
                        <hr className="w-32 my-2 border-t-1 border-t-pastel-yellow" />
                        <div className="flex mt-4 space-x-4 sm:mt-0">

                            <a href="#" className=" hover:text-gray-900 dark:hover:text-white">
                                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 17">
                                    <path fillRule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clipRule="evenodd" />
                                </svg>
                                <span className="sr-only">Twitter page</span>
                            </a>
                            <a href="#" className=" hover:text-gray-900 dark:hover:text-white">
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
                                    <path d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"></path>
                                </svg>
                                <span className="sr-only">Instagram community</span>
                                {/* https://icons8.com/icons/set/instagram */}
                            </a>
                            <a href="#" className=" hover:text-gray-900 dark:hover:text-white">
                                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 8 19">
                                    <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd" />
                                </svg>
                                <span className="sr-only">Facebook page</span>
                            </a>

                        </div>
                    </div>

                    <div className="col-span-2 mt-8">
                        <span className="text-sm sm:text-center dark:text-gray-400">© 2024 <a href="#" className="hover:underline">Company</a>. All Rights Reserved.
                        </span>
                    </div>

                </div>

            </div>

        </footer>
    )
}

export default Footer