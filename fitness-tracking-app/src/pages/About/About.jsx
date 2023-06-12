import { Flex, Card, Avatar, Heading, Text } from "@chakra-ui/react";
import image from "../../assets/vi.jpg";
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
              // src={image}
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
                <Text fontStyle="normal">+359 885 29 29 29</Text>
                <Text fontStyle="normal">ivan@gmail.com</Text>
              </Flex>
            </Flex>
            <Flex>
              <NavLink to="">
                <AiFillLinkedin />
              </NavLink>
              <NavLink to="">
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
              // src={image}
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
                <Text fontStyle="normal">+359 885 38 78 88</Text>
                <Text fontStyle="normal">momchil@gmail.com</Text>
              </Flex>
            </Flex>
            <Flex>
              <NavLink to="">
                <AiFillLinkedin />
              </NavLink>
              <NavLink to="">
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
