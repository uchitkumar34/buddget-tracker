import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='min-h-screen flex justify-center items-center bg-slate-500 text-white '>
      <div className='text-center '>
        <h1 className='text-3xl '>404</h1>
        <p className='text-xl'>Page not  found</p>
        <Link to="/" className='text-blue-400 underline text-xl ' > Return to Home</Link>
      </div>
    </div>
  );
}

export default NotFound;
