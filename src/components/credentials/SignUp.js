// import { createUserWithEmailAndPassword } from "firebase/auth";
// import React, { useState } from "react";
// import { auth } from "../../../firebase";
// import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
// import { signInWithPopup } from "firebase/auth";

// export const SignUp = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const SignUp = (e) => {
//     e.preventDefault();
//     createUserWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         // Signed Up
//         const user = userCredential.user;
//         console.log(user);
//         // ...
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const googleSignIn = () => {
//     const provider = new GoogleAuthProvider();
//     signInWithPopup(auth, provider)
//       .then((result) => {
//         // Signed in with Google
//         const user = result.user;
//         console.log(user);
//         // ...
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const githubSignIn = () => {
//     const provider = new GithubAuthProvider();
//     signInWithPopup(auth, provider)
//       .then((result) => {
//         // Signed in with GitHub
//         const user = result.user;
//         console.log(user);
//         // ...
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   // Usage:

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//       }}
//     >
//       <form
//         style={{
//           width: "300px",
//           padding: "20px",
//           border: "1px solid #ccc",
//           borderRadius: "5px",
//         }}
//         onSubmit={SignUp}
//       >
//         <h1 style={{ textAlign: "center" }}>Sign Up</h1>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
//         ></input>
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
//         ></input>
//         <button
//           type="submit"
//           style={{
//             width: "100%",
//             padding: "10px",
//             backgroundColor: "#4CAF50",
//             color: "white",
//             border: "none",
//             borderRadius: "3px",
//           }}
//         >
//           Sign Up
//         </button>
//         <button onClick={googleSignIn}>Sign in with Google</button>
//         <button onClick={githubSignIn}>Sign in with GitHub</button>
//       </form>
//     </div>
//   );
// };
import { useSignUp } from "../../hooks/auth";
import React from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Button,
  
  Text,
  Icon,
  Center,
} from "@chakra-ui/react";
import { emailValidate, passwordValidate } from "./form-validate.js";
import { RiMailLine, RiLockPasswordFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";

import { HOME } from "../../Route/routes.js";

const Register = () => {
  const { register: signup, isLoading } = useSignUp();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    signup({
      
      email: data.email,
      password: data.password,
    });
  };

  return (
    <Box
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to right, purple.400, pink.500)"
    >
      <Link
        as={RouterLink}
        to={HOME}
        fontWeight="medium"
        textDecor="underline"
        _hover={{ background: "teal.100" }}
      >
        <Icon as={FaAngleLeft} />
        Back to Home
      </Link>
      <Box
        p="8"
        mt="150"
        mx="auto"
        maxWidth="450px"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        bg="white"
      >
        <form onSubmit={handleSubmit(handleRegister)}>
          <Text
            fontSize="px"
            fontWeight="bold"
            lineHeight="110%"
            mb="4"
            size="lg"
            letterSpacing="-1%"
          >
            <Center>Registration or SignUp</Center>
          </Text>
          

          <FormControl mb="4">
            <FormLabel>Email</FormLabel>
            <Flex>
              <Input
                type="email"
                placeholder="Enter your email"
                {...register("email", emailValidate)}
              />
              <Box ml="2" padding="2">
                <RiMailLine size="20px" color="gray.500" />
              </Box>
            </Flex>
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Password</FormLabel>
            <Flex>
              <Input
                type="password"
                placeholder="Enter your password"
                {...register("password", passwordValidate)}
              />
              <Box ml="2" padding="2">
                <RiLockPasswordFill size="20px" color="gray.500" />
              </Box>
            </Flex>
          </FormControl>

          <Button
            type="submit"
            colorScheme="purple"
            width="full"
            isLoading={isLoading}
            loadingText="Signing Up"
          >
            SignUp
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
