import {
  Flex,
  Box,
  Spinner,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
  Select,
  Avatar,
  Text,
  Heading,
  Button,
  FormErrorMessage,
  FormHelperText
} from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import { logoutUser } from "../../services/auth.services";
import { AuthContext } from "../../common/context";
import { useNavigate } from "react-router-dom";
import {  uploadAvatar } from "../../services/user.service";
import { getUserByHandle } from "../../services/user.service";
import { updateUserProfile } from "../../services/user.service";
import { countryList } from "../../common/countriesData";

const Profile = () => {
  const [image, setImage] = useState("");
  const [newImageData, setNewImageData] = useState(null)
  const [isUploading, setIsUploading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdayDate, setBirthdayDate] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const fetchUser = async () => {
        try {
          const userSnapshot = await getUserByHandle(user.displayName);
          console.log("snapshot", userSnapshot);
            setFirstName(userSnapshot.firstName)
            setLastName(userSnapshot.lastName);
            setImage(userSnapshot.photoURL);
            setWeight(userSnapshot.weight);
            setHeight(userSnapshot.height)
            setPhoneNumber(userSnapshot.phone);
            setGender(userSnapshot.gender);
            setCountry(userSnapshot.country);
            setBirthdayDate(userSnapshot.birthDate);
        } catch (error) {
          console.log(error);
        }
      };

      fetchUser();
    }
  }, [user]);

  const handleLogOut = () => {
    logoutUser()
      .then(() => {
        setUser({
          user: null,
          userData: null,
        });
      })
      .finally(() => navigate("/"));
  };

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setNewImageData(e.target.files[0]);
  };

  const handleSave = async () => {
        setIsUploading(true);
    try {
    let avatarURL

    if (newImageData) {
        avatarURL = await uploadAvatar(user.uid, newImageData);
    }

    await updateUserProfile(
        user.displayName,
        firstName,
        lastName,
        phoneNumber,
        weight,
        gender,
        avatarURL ? avatarURL : image,
        height,
        country,
        birthdayDate,
    );
    } catch (error){
        console.error("Error updating user avatar:", error);
    } finally {
        setIsUploading(false);
    }    
  };

  const isError = firstName === "";
  return (
    <Flex
      position="relative"
      w="100vw"
      h="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Flex flexDir="column" alignItems="center" w="100%" h="100%" margin={450}>
        <Heading size="md" fontWeight="bold" paddingBottom={50}>
          Profile Information
        </Heading>
        <Flex w="100%" h="500px" paddingBottom={50} gap={20}>
          <Flex flex="1">
            <FormControl>
              <Avatar
                size="3xl"
                borderRadius="full"
                src={image}
              />
              <Input
                type="file"
                height="100%"
                width="100%"
                position="absolute"
                top="0"
                left="0"
                opacity="0"
                aria-hidden="true"
                accept="image/*"
                onChange={handleImageChange}
              />
            </FormControl>
          </Flex>
          <Flex flex="2" flexDir="column" marginTop={5}>
            <Text fontWeight="bold" paddingBottom={5}>
              Member since 
            </Text>
            <Text fontWeight="bold" paddingBottom={5}>
              Friends
            </Text>
            <Text fontWeight="bold" paddingBottom={5}>
              All Time Duration
            </Text>
          </Flex>
        </Flex>
        <FormControl isInvalid={isError} paddingBottom={10}>
          <FormLabel fontWeight="bold"> First Name</FormLabel>
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter First Name"
            border="1px"
            borderColor="gray.500"
            borderRadius="4px"
            w={550}
            h={55}
            _hover={{
              borderColor: "gray.900",
              border: "2px",
            }}
            _focus={{
              borderColor: "gray.900",
              boxShadow: "2xl",
              border: "2px",
            }}
          />
          {!isError ? (
        <FormHelperText>
          Enter your first name.
        </FormHelperText>
      ) : (
        <FormErrorMessage>Name is required.</FormErrorMessage>
      )}
        </FormControl>
        <FormControl isRequired paddingBottom={10}>
          <FormLabel fontWeight="bold">Last Name</FormLabel>
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter Last Name"
            border="1px"
            borderColor="gray.500"
            borderRadius="4px"
            w={550}
            h={55}
            _hover={{
              borderColor: "gray.900",
              border: "2px",
            }}
            _focus={{
              borderColor: "gray.900",
              boxShadow: "2xl",
              border: "2px",
            }}
          />
        </FormControl>
        <FormControl isRequired paddingBottom={10}>
          <FormLabel fontWeight="bold">Birth Date</FormLabel>
          <Input
            value={birthdayDate}
            onChange={(e) => setBirthdayDate(e.target.value)}
            placeholder="Select Date and Time"
            type="date"
            border="1px"
            borderColor="gray.500"
            borderRadius="4px"
            w={550}
            h={55}
            _hover={{
              borderColor: "gray.900",
              border: "2px",
            }}
            _focus={{
              borderColor: "gray.900",
              boxShadow: "2xl",
              border: "2px",
            }}
          />
        </FormControl>
        <Flex alignItems="center" w="100%" h="100%" gap={5} paddingBottom={10}>
          <Flex flex="1">
            <FormControl>
              <FormLabel fontWeight={"bold"}>Weight (kg)</FormLabel>
              <NumberInput
                value={weight}
                max={500.0}
                min={10.0}
                step={0.1}
                h={55}
                border="1px"
                borderColor="gray.500"
                borderRadius="4px"
                _hover={{
                  borderColor: "gray.900",
                  border: "2px",
                }}
                _focus={{
                  borderColor: "gray.900",
                  boxShadow: "2xl",
                  border: "2px",
                }}
              >
                <NumberInputField
                  onChange={(e) => setWeight(e.target.value)}
                  h={55}
                  border="0px"
                  borderColor="gray.500"
                  borderRadius="4px"
                  _hover={{ borderColor: "gray.900" }}
                  _focus={{
                    borderColor: "gray.900",
                    boxShadow: "2xl",
                    border: "2px",
                  }}
                />
                <NumberInputStepper border={"none"}>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </Flex>
          <Flex flex="1" w="100%">
            <FormControl>
              <FormLabel fontWeight={"bold"}>Height (m)</FormLabel>
              <NumberInput
                value={height}
                max={4.0}
                min={1.0}
                step={0.01}
                h={55}
                border="1px"
                borderColor="gray.500"
                borderRadius="4px"
                _hover={{
                  borderColor: "gray.900",
                  border: "2px",
                }}
                _focus={{
                  borderColor: "gray.900",
                  boxShadow: "2xl",
                  border: "1px",
                }}
              >
                <NumberInputField
                 onChange={(e) => setHeight(e.target.value)}

                  h={55}
                  border="0px"
                  borderColor="gray.500"
                  borderRadius="4px"
                  _hover={{ borderColor: "gray.900" }}
                  _focus={{
                    borderColor: "gray.900",
                    boxShadow: "2xl",
                    border: "2px",
                  }}
                />
                <NumberInputStepper border="none">
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </Flex>
        </Flex>
        <FormControl isRequired paddingBottom={10}>
          <FormLabel fontWeight="bold">Gender</FormLabel>
          <Select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder="Select gender"
            border="1px"
            borderColor="gray.500"
            borderRadius="4px"
            w={550}
            h={55}
            _hover={{
              borderColor: "gray.900",
              border: "2px",
            }}
            _focus={{
              borderColor: "gray.900",
              boxShadow: "2xl",
              border: "2px",
            }}
          >
            <option>Female</option>
            <option>Male</option>
          </Select>
        </FormControl>
        <FormControl paddingBottom={10}>
          <FormLabel fontWeight="bold">Phone number</FormLabel>
          <Input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter Phone Number"
            border="1px"
            borderColor="gray.500"
            borderRadius="4px"
            w={550}
            h={55}
            _hover={{
              borderColor: "gray.900",
              border: "2px",
            }}
            _focus={{
              borderColor: "gray.900",
              boxShadow: "2xl",
              border: "2px",
            }}
          />
        </FormControl>
        <FormControl paddingBottom={10}>
          <FormLabel fontWeight="bold">Country</FormLabel>
          <Select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Select country"
            border="1px"
            borderColor="gray.500"
            borderRadius="4px"
            w={550}
            h={55}
            _hover={{
              borderColor: "gray.900",
              border: "2px",
            }}
            _focus={{
              borderColor: "gray.900",
              boxShadow: "2xl",
              border: "2px",
            }}
          >
            {countryList.map((el, i) => <option key={i}>{el}</option>)}
          </Select>
        </FormControl>
        <Flex paddingBottom={10} gap={10}>
          <Button
            size="md"
            w="200px"
            border="1px"
            borderColor="gray.500"
            borderRadius="4px"
            color="white"
            bgColor="black"
            _hover={{
              borderColor: "gray.900",
              border: "2px",
            }}
            _focus={{
              borderColor: "gray.900",
              boxShadow: "2xl",
              border: "2px",
            }}
            onClick={handleSave}
          >
            Save
            {isUploading && (
              <Spinner
                thickness="2px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="sm"
                ml={2}
              />
            )}
          </Button>
          <Button
            size="md"
            w="100px"
            border="1px"
            borderColor="gray.500"
            borderRadius="4px"
            color="white"
            bgColor="gray.500"
            _hover={{
              borderColor: "gray.900",
              border: "2px",
            }}
            _focus={{
              borderColor: "gray.900",
              boxShadow: "2xl",
              border: "2px",
            }}
            onClick={handleLogOut}
          >
            Log out
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Profile;
