import { ToastContainer } from "react-toastify";

const DashboardLayout = ({ children }) => {
    return (
        <div className='min-h-screen bg-slate-100 '>
            <ToastContainer />
            <header className='bg-white shadow-sm'>
                <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4'>
                    <div className='flex justify-center md:justify-between items-center'>
                        <h2 className='text-4xl font-bold text-expese'>Expensive Tracker</h2>
                        <p className='hidden md:block text-gray-500'>track your Expenses with ease</p>
                    </div>
                </div>
            </header>

            <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                {children}
            </main>

            <footer className='bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] '>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
                    <p className='text-gray-500 text-sm text-center'> Buddget tracker &copy; {new Date().getFullYear()} </p>
                </div>
            </footer>
        </div>
    );
}

export default DashboardLayout;
