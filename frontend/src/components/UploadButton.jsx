// // src/components/UploadButton.jsx
// 'use client';

// import { forwardRef, useState, useRef } from 'react';
// import {
//   Box,
//   Center,
//   Circle,
//   Icon,
//   useToken,
//   useToast,
// } from '@chakra-ui/react';
// import { FiUpload } from 'react-icons/fi';  // Update to a valid icon

// const UploadButton = forwardRef((props, ref) => {
//   const [isDragging, setIsDragging] = useState(false);
//   const fileInputRef = useRef(null);
//   const toast = useToast();
  
//   const [gray50, gray100, gray200, gray800, gray900] = useToken(
//     'colors',
//     ['gray.50', 'gray.100', 'gray.200', 'gray.800', 'gray.900']
//   );

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = () => {
//     setIsDragging(false);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const files = e.dataTransfer.files;
//     if (files.length) {
//       handleFiles(files);
//     }
//   };

//   const handleFiles = (files) => {
//     toast({
//       title: 'File received',
//       description: `Uploading: ${files[0].name}`,
//       status: 'success',
//       duration: 3000,
//       isClosable: true,
//     });
//     console.log('Files received:', files);
//   };

//   const handleFileInput = (e) => {
//     if (e.target.files.length) {
//       handleFiles(e.target.files);
//     }
//   };

//   return (
//     <Box
//       position="relative"
//       h="full"
//       bg={gray50}
//     >
//       <Center
//         h="full"
//         px={4}
//         py={8}
//       >
//         <Box
//           w="full"
//           h="full"
//           maxW="container.lg"
//           borderRadius="3xl"
//           bg={isDragging ? gray900 : gray100}
//           transition="all 0.3s ease-out"
//           cursor="pointer"
//           _hover={{ bg: gray200 }}
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           onDrop={handleDrop}
//           onClick={() => fileInputRef.current?.click()}
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//         >
//           <Circle
//             size="28"
//             bg={isDragging ? gray800 : 'white'}
//             boxShadow={isDragging ? 'none' : 'lg'}
//             transform={isDragging ? 'scale(1.25)' : 'scale(1)'}
//             transition="all 0.3s ease-out"
//             _hover={{ transform: 'scale(1.1)' }}
//           >
//             <Icon
//               as={FiUpload}  // Updated icon
//               w={14}
//               h={14}
//               color={isDragging ? 'white' : gray800}
//               transition="color 0.3s ease-out"
//             />
//           </Circle>

//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/*"
//             capture="environment"
//             onChange={handleFileInput}
//             hidden
//           />
//         </Box>
//       </Center>
//     </Box>
//   );
// });

// // Add a display name for the component
// UploadButton.displayName = 'UploadButton';

// export default UploadButton;
