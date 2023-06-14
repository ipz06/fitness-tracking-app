import { Flex, Card, Avatar, Heading, Text } from "@chakra-ui/react";
import image from "../../assets/vi.jpg";
import momchil from "../../assets/momchil_cv.jpg";
import imageIvan from "../../assets/Ivan.jpg";
import { AiFillGitlab, AiFillLinkedin } from "react-icons/all";
import { NavLink } from "react-router-dom";

const About = () => {
  return (
    <Flex justifyContent="center" paddingX="16px" paddingTop="20px">
      <Flex direction="column" alignItems="center">
        <Heading
          fontWeight="bold"
          fontStyle="normal"
          fontSize={{ base: "md", sm: "xl", md: "2xl" }}
          paddingBottom={50}
        >
          ABOUT US
        </Heading>
        <Text
          fontWeight="bold"
          fontStyle="normal"
          fontSize={{ base: "md", sm: "xl", md: "2xl" }}
          paddingBottom={50}
        >
          Web Team 07
        </Text>
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={10}
          justifyContent="space-between"
          w="100%"
          paddingBottom={50}
        >
          <Card
            align="center"
            h={{ base: "400px", lg: "400px" }}
            w={{ base: "300px", lg: "300px" }}
            marginX={"auto"}
            marginY="10px"
            padding="4px"
          >
            <Avatar
              w="150px"
              h="150px"
              borderRadius="full"
              src={imageIvan}
              marginBottom={10}
              marginTop={10}
            />
            <Heading size="md" marginBottom={5}>
              Ivan Damyankin
            </Heading>
            <Flex justifyContent="space-between" marginBottom={5}>
              <Flex direction="column">
                <Text fontStyle="normal" fontWeight="bold">
                  email:
                </Text>
                <Text fontStyle="normal" fontWeight="bold">
                  phone:
                </Text>
              </Flex>
              <Flex direction="column">
                <Text fontStyle="normal">+359 896 68 34 58</Text>
                <Text fontStyle="normal">idamyankin@gmail.com</Text>
              </Flex>
            </Flex>
            <Flex>
              <NavLink to="https://www.linkedin.com/in/ivan-damyankin/">
                <AiFillLinkedin />
              </NavLink>
              <NavLink to="https://gitlab.com/ipz06/fitness-tracking-app">
                <AiFillGitlab />
              </NavLink>
            </Flex>
          </Card>
          <Card
            align="center"
            h={{ base: "400px", lg: "400px" }}
            w={{ base: "300px", lg: "300px" }}
            marginX={"auto"}
            marginY="10px"
            padding="4px"
          >
            <Avatar
              w="150px"
              h="150px"
              borderRadius="full"
              src={image}
              marginBottom={10}
              marginTop={10}
            />
            <Heading size="md" marginBottom={5}>
              Ivanka Zlateva
            </Heading>
            <Flex justifyContent="space-between" marginBottom={5}>
              <Flex direction="column">
                <Text fontStyle="normal" fontWeight="bold">
                  email:
                </Text>
                <Text fontStyle="normal" fontWeight="bold">
                  phone:
                </Text>
              </Flex>
              <Flex direction="column">
                <Text fontStyle="normal">+359 885 29 39 06</Text>
                <Text fontStyle="normal">it.vania.9@gmail.com</Text>
              </Flex>
            </Flex>
            <Flex>
              <NavLink to="https://bg.linkedin.com/in/ivanka-zlateva-aa2258132?trk=people-guest_people_search-card">
                <AiFillLinkedin />
              </NavLink>
              <NavLink to="https://gitlab.com/ipz06/fitness-tracking-app">
                <AiFillGitlab />
              </NavLink>
            </Flex>
          </Card>
          <Card
            align="center"
            h={{ base: "400px", lg: "400px" }}
            w={{ base: "300px", lg: "300px" }}
            marginX={"auto"}
            marginY="10px"
            padding="4px"
          >
            <Avatar
              w="150px"
              h="150px"
              borderRadius="full"
              src={momchil}
              marginBottom={10}
              marginTop={10}
            />
            <Heading size="md" marginBottom={5}>
              Momchil Mirov
            </Heading>
            <Flex justifyContent="space-between" marginBottom={5}>
              <Flex direction="column">
                <Text fontStyle="normal" fontWeight="bold">
                  email:
                </Text>
                <Text fontStyle="normal" fontWeight="bold">
                  phone:
                </Text>
              </Flex>
              <Flex direction="column">
                <Text fontStyle="normal">+359 895 64 58 72</Text>
                <Text fontStyle="normal">mirov.momchil@gmail.com</Text>
              </Flex>
            </Flex>
            <Flex>
              <NavLink to="https://www.linkedin.com/in/momchil-mirov-6642b450?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BYNlgtcekRhqQ1AEfU7e7NA%3D%3D">
                <AiFillLinkedin />
              </NavLink>
              <NavLink to="https://gitlab.com/M0mchill">
                <AiFillGitlab />
              </NavLink>
            </Flex>
          </Card>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default About;
