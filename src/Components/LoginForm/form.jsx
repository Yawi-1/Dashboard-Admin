// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AuthPage = ({ onLoginSuccess }) => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       if (isLogin) {
//         const response = await axios.post("http://localhost:8000/api/v1/users/login", {
//           email,
//           password
//         });
//                // all data show loging user
//         console.log('Login :', response.data);

//         localStorage.setItem('token', response.data.token);
        
//         if (onLoginSuccess) {
//           onLoginSuccess();
//         }
//       } else {
//         if (password !== confirmPassword) {
//           setError('Passwords do not match');
//           setLoading(false);
//           return;
//         }
//      //  end point api 
//         const response = await axios.post("http://localhost:8000/api/v1/users/register", {
//           email,
//           username,
//           password
//         });
//             // register all data 
//         console.log('Registration :', response.data);
        
//         setIsLogin(true);
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'An error occurred');
//       console.error('Authentication error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/api/v1/users/getAllUsers", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//         // all data show suer data 
//       console.log("Users data:", response.data);
//     } catch (err) {
//       console.error('Error fetching users:', err);
//     }
//   };

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       fetchUsers();
//     }
//   }, []);

//   return (
//     <div className="min-h-screen flex items-center bg-[#182638] justify-center px-4">
//       <div className="w-full max-w-md">
//         <form 
//           onSubmit={handleSubmit} 
//           className="bg-[#2c4366] shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
//         >
//           <h2 className="text-2xl text-center font-bold mb-6 text-white">
//             {isLogin ? 'Login' : 'Register'}
//           </h2>

//           {error && (
//             <div className="mb-4 text-red-500 text-center">
//               {error}
//             </div>
//           )}

//           <div className="mb-4">
//             <label 
//               htmlFor="email" 
//               className="block text-white text-sm font-bold mb-2"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="shadow appearance-none border rounded w-full py-2 px-3 bg-[#2c4366] text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your email"
//             />
//           </div>

//           {!isLogin && (
//             <div className="mb-4">
//               <label 
//                 htmlFor="username" 
//                 className="block text-white text-sm font-bold mb-2"
//               >
//                 Username
//               </label>
//               <input
//                 type="text"
//                 id="username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//                 className="shadow appearance-none border rounded w-full py-2 px-3 bg-[#2c4366] text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Choose a username"
//               />
//             </div>
//           )}

//           <div className="mb-4">
//             <label 
//               htmlFor="password" 
//               className="block text-white text-sm font-bold mb-2"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="shadow appearance-none border rounded w-full py-2 px-3 bg-[#2c4366] text-white mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your password"
//             />
//           </div>

//           {!isLogin && (
//             <div className="mb-4">
//               <label 
//                 htmlFor="confirm-password" 
//                 className="block text-white text-sm font-bold mb-2"
//               >
//                 Confirm Password
//               </label>
//               <input
//                 type="password"
//                 id="confirm-password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//                 className="shadow appearance-none border rounded w-full py-2 px-3 bg-[#2c4366] text-white mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Confirm your password"
//               />
//             </div>
//           )}

//           <div className="flex items-center justify-between">
//             <button
//               type="submit"
//               disabled={loading}
//               className={`text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${
//                 loading 
//                   ? 'bg-gray-500 cursor-not-allowed' 
//                   : 'bg-blue-500 hover:bg-blue-700'
//               }`}
//             >
//               {loading 
//                 ? (isLogin ? 'Logging in...' : 'Registering...') 
//                 : (isLogin ? 'Login' : 'Register')
//               }
//             </button>
//           </div>

//           <div className="text-center mt-4">
//             <button
//               type="button"
//               onClick={() => {
//                 setIsLogin(!isLogin);
//                 setError(''); 
//                 setEmail('');
//                 setUsername('');
//                 setPassword('');
//                 setConfirmPassword('');
//               }}
//               className="text-blue-500 hover:text-blue-800 text-sm"
//             >
//               {isLogin 
//                 ? 'Need an account? Register' 
//                 : 'Already have an account? Login'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;