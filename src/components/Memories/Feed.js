import {
  Box,
  HStack,
  Heading,
  Button,
  Textarea,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import TextareaAutosize from "react-textarea-autosize";

import { useForm } from "react-hook-form";
import useAuth from "../../hooks/auth";
import PostsList from "./PostsList";
import { usePosts, useAddPost } from "./AddMemory";

function NewPost() {
  const { register, handleSubmit, reset } = useForm();
  const { addPost, isLoading: addingPost } = useAddPost();
  const { user, isLoading: authLoading } = useAuth();

  function handleAddPost(data) {
    addPost({
      uid: user.id,
      text: data.text,
    });
    reset();
  }

  return (
    <Box
      maxWidth="900px"
      width="100%"
      py="4"
      position="sticky"
      top="0"
      bg="white"
      boxShadow="lg"
      mx="auto"
      px="4"
      mt="4"
    >
      <form onSubmit={handleSubmit(handleAddPost)}>
        <HStack justify="space-between">
          <Heading size="lg">New Post</Heading>
          <Button
            bgColor="purple.800"
            colorScheme="white"
            type="submit"
            isLoading={addingPost}
            loadingText="Loading..."
          >
            Post
          </Button>
        </HStack>
        <Textarea
          as={TextareaAutosize}
          mt={5}
          resize="none"
          placeholder="Create a new post..."
          minRows={3}
          {...register("text", { required: true })}
        />
      </form>
    </Box>
  );
}

export default function Feed() {
  const { posts, isLoading } = usePosts();

  if (isLoading)
    return (
      <Box padding="6" boxShadow="lg" bg="white">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
      </Box>
    );

  return (
    <Box mx="auto" maxWidth="900px" px="4" mt="4">
      <NewPost />
      <PostsList posts={posts} />
    </Box>
  );
}
