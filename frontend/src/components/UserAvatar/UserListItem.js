import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{ background: "#38B2AC", color: "white" }}
      w="100%"
      display="flex"
      alignItems="center"
      color="black"
      mb={2}
      px={2}
      py={2}
      borderRadius="lg"
    >
      <Avatar size="sm" mr={2} name={user.name} src={user.image} />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="sm">
          <b>Email: </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
