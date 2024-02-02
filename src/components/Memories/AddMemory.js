import React, { useEffect, useState } from "react";
import { storage } from "../../firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

import { db } from "../../firebase";
import { useToast } from "@chakra-ui/react";
import { uuidv4 } from "@firebase/util";
import {
  setDoc,
  doc,
  collection,
  query,
  orderBy,
  where,
} from "firebase/firestore";

import { Box, Button, Image, Input, VStack } from "@chakra-ui/react";
import { useCollectionData } from "react-firebase-hooks/firestore";

export function useAddPost() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  async function addPost(post) {
    setLoading(true);
    const id = uuidv4();
    await setDoc(doc(db, "posts", id), {
      ...post,
      id,
      date: Date.now(),
      likes: [],
    });
    toast({
      title: "Post added successfully!",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 2000,
    });
    setLoading(false);
  }
  return { addPost, isLoading };
}

export function usePosts(uid = null) {
  const q = uid
    ? query(
        collection(db, "posts"),
        orderBy("date", "desc"),
        where("uid", "==", uid)
      )
    : query(collection(db, "posts"), orderBy("date", "desc"));
  const [posts, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  return { posts, isLoading };
}

function AddMemory() {
  const [img, setImg] = useState("");
  const [imgUrl, setImgUrl] = useState([]);

  const handleClick = () => {
    if (img !== null) {
      const imgRef = ref(storage, `files/${v4()}`);
      uploadBytes(imgRef, img).then((value) => {
        console.log(value);
        getDownloadURL(value.ref).then((url) => {
          setImgUrl((data) => [...data, url]);
        });
      });
    }
  };

  useEffect(() => {
    listAll(ref(storage, "files")).then((imgs) => {
      console.log(imgs);
      imgs.items.forEach((val) => {
        getDownloadURL(val).then((url) => {
          setImgUrl((data) => [...data, url]);
        });
      });
    });
  }, []);

  // ...

  return (
    <VStack spacing={4} align="center">
      <Input type="file" onChange={(e) => setImg(e.target.files[0])} />
      <Button onClick={handleClick}>Upload</Button>
      <Box>
        {imgUrl.map((dataVal) => (
          <Box key={dataVal}>
            <Image src={dataVal} alt=""  />
            <br />
          </Box>
        ))}
      </Box>
    </VStack>
  );
}

export default AddMemory;
