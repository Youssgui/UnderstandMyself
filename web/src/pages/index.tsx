import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { Flex, Box, Text, Button, se } from "@chakra-ui/core";
import NextLink from "next/link";


const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <>
      <NavBar />
      <Flex justify="center" m="100px">
      <Text fontSize="6xl" textAlign="center" color="#0987A0"> Welcome to FindMyself </Text>
      </Flex>

      <Flex justify="center" m="100px">
      <Text fontSize="3xl" textAlign="center" color="#0987A0"> A place where we help you understand the person you are and structure your goals </Text>
      </Flex>


      <Flex justify="center" m="100px"> 

      {/* <Text fontSize="6xl" textAlign="center" color="#0987A0"> Welcome to FindMyself </Text> */}

      

      
      <NextLink href="/test">
      <Button           loadingText="Submitting"                
                   variant="solid"
                type="button">             
             Try our Personality Test 
        </Button>
          </NextLink>
         </Flex>





     {/* what to do if we are signed in? */}
     {/* show personality results */}
      <br />
      {!data ? (
        <div>loading...</div>
      ) : (
        data.posts.map((p) => <div key={p.id}>{p.title}</div>)
      )}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
