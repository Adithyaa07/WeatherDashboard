import {
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import { NavLink } from "react-router-dom";

// function NavBar() {
//   return (
//     <Flex as="nav" bg="gray.800" height="60px">
//       <Flex px="4" w="full" align="center" maxW="1600px">
//         <Menu>
//           <MenuButton>
//             <Text color="teal" fontWeight="bold" fontSize={35} mt="20px">
//              menu
//             </Text>
//           </MenuButton>
//           <MenuList>
//             <MenuItem>Farming</MenuItem>
//             <MenuItem>Travelling</MenuItem>
//             <MenuItem>Event Planning</MenuItem>
//           </MenuList>
//         </Menu>

//         <Spacer />
//         <Text color="teal" fontWeight="bold" fontSize={35} mt="20px">
//           Weather Dashboard
//         </Text>
//         <Spacer />
//         <IconButton
//           aria-label="Notifications"
//           variant="ghost"
//           bg="white"
//           icon={<Icon as={HiOutlineBell} boxSize="6" />}
//           mr="4"
//         />
// <Menu>
//   <MenuButton as={IconButton} aria-label="Profile">
//     <Avatar size="sm" src="/path/to/profile-image.jpg" />
//   </MenuButton>
//   <MenuList>
//     <MenuItem>Settings</MenuItem>
//     <MenuItem as={NavLink} to="/">
//       Home
//     </MenuItem>
//   </MenuList>
// </Menu>
//       </Flex>
//     </Flex>
//   );
// }

// export default NavBar;

// import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Flex
      justify="space-between"
      align="left"
      bg="gray.800"
      borderColor="gray.100"
      w="full"
      px="44"
      py="2"
    >
      <>
        <Text
          fontSize="3xl"
          fontWeight="extrabold"
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontFamily="roboto"
        >
          Weather Dashboard
        </Text>
      </>
      {/* <Flex justify="center" align="center" mx="auto"></Flex> */}

      <Menu>
        <MenuButton
          bg="teal"
          color="white"
          fontWeight="bold"
          fontSize={16}
          px={4}
          py={2}
          borderRadius="md"
          _hover={{ bg: "teal.500" }}
          _expanded={{ bg: "teal.500" }}
          _focus={{ outline: "none" }}
        >
          More
        </MenuButton>
        <MenuList>
          <MenuItem
            as={NavLink}
            to="/main/farming"
            _hover={{ bg: "teal.500", color: "white" }}
          >
            For Farming
          </MenuItem>
          <MenuItem as={NavLink} to="/main/planners" _hover={{ bg: "teal.500", color: "white" }}>
            Event Planners
          </MenuItem>
          <MenuItem
            as={NavLink}
            to="/main/travellers"
            _hover={{ bg: "teal.500", color: "white" }}
          >
            Travellers
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Navbar;
