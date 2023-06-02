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
  FormHelperText,
  Spacer,
  Wrap
} from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import { logoutUser } from "../../services/auth.services";
import { AuthContext } from "../../common/context";
import { useNavigate } from "react-router-dom";
import {  uploadAvatar } from "../../services/user.service";
import { getUserByHandle } from "../../services/user.service";
import { updateUserProfile } from "../../services/user.service";
import { countryList } from "../../common/countriesData";
import { MAX_HEIGHT, MAX_WEIGHT, MIN_HEIGHT, MIN_WEIGHT, NAME_MAX_LENGTH, NAME_MIN_LENGTH, phoneRegex } from "../../common/constants";
import { toast } from 'react-toastify';
import Badges from "../../components/Goals/Badges/Badges";
import { wrap } from "framer-motion";

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
  const [createdOn, setCreatedOn] = useState("");
  const { user, setUser, handle, appState, setAppState} = useContext(AuthContext);
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
            setCreatedOn(userSnapshot.createdOn);
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
    const image = e.target.files[0];
 
    
    if (!image.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      alert('Select valid image!');
     return false;
    }

    setImage(URL.createObjectURL(image));
    setNewImageData(image);

  };

  const handleSave = async () => {
        setIsUploading(true);
    try {

    let avatarURL 
    if (newImageData) {
        avatarURL = await uploadAvatar(user.uid, newImageData);
        setAppState({...appState, photo: avatarURL , weight: weight})
    } else {
      setAppState({...appState, weight:weight})
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
        toast.warning(`You have to fill all the fields!`)
    } finally {
        setIsUploading(false);
    }    
  };

  const modifyDate = (createdOn) => {
    const date = createdOn.slice(0,10);
    const year = date.substring(0,4);
    const month = date.substring(5,7);
    const day = date.substring(8);
    return `${day}-${month}-${year}`
  }

  const isErrorFirstName = firstName === "" || firstName.length <= NAME_MIN_LENGTH || firstName.length > NAME_MAX_LENGTH;
  const isErrorLastName = lastName === "" || lastName.length <=  NAME_MIN_LENGTH || lastName.length > NAME_MAX_LENGTH;
  const isErrorWeight = weight === "" || weight < MIN_WEIGHT || weight > MAX_WEIGHT;
  const isErrorHeight = height === "" || height < MIN_HEIGHT || height > MAX_HEIGHT;
  const isErrorPhone = phoneNumber === "" || !phoneRegex.test(phoneNumber);
  const isErrorBirthday = birthdayDate === "";

  return (
    <Flex
      position="relative"
      w="100%"
      h="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Flex flexDir="column" alignItems="center" w="100%" h="100%" margin={450}>
        <Heading size="md" fontWeight="bold" fontStyle="normal" paddingBottom={50}>
          PROFILE INFORMATION
        </Heading>
        <Flex w="100%" h="500px" paddingBottom={50} gap={10} justifyContent={"space-between"}>
          <Flex flex="1" w="100%" marginTop={5}>
            <FormControl>
              <Avatar
                size="2xl"
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
          <Flex flex="2" flexDir="column" w="100%" marginTop={5}>
            <Text fontWeight="bold" fontStyle="normal" paddingBottom={5}>
              Member since: {modifyDate(createdOn)}
            </Text>
            <Text fontWeight="bold" fontStyle="normal" paddingBottom={5}>
              Friends
            </Text>
            <Text fontWeight="bold" fontStyle="normal" paddingBottom={5}>
              Achievements
            </Text>
            <Flex>
            <Badges handle={handle} />
            </Flex>
          </Flex>
        </Flex>
        <Flex  w="100%">
        <FormControl isInvalid={isErrorFirstName} paddingBottom={10}>
          <FormLabel fontWeight="bold"> First Name</FormLabel>
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter First Name"
            border="1px"
            borderColor="gray.500"
            borderRadius="4px"
            w="100%"
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
          {!isErrorFirstName ? (
        <FormHelperText>
          Enter your first name.
        </FormHelperText>
      ) : (
        <FormErrorMessage>Name is required and the length must be greater than 1 symbol.</FormErrorMessage>
      )}
        </FormControl>
        </Flex>
        <FormControl isInvalid={isErrorLastName} paddingBottom={10}>
          <FormLabel fontWeight="bold">Last Name</FormLabel>
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter Last Name"
            border="1px"
            borderColor="gray.500"
            borderRadius="4px"
            w="100%"
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
          {!isErrorLastName ? (
        <FormHelperText>
          Enter your last name.
        </FormHelperText>
      ) : (
        <FormErrorMessage>Name is required and the length must be greater than 1 symbol.</FormErrorMessage>
      )}
        </FormControl>
        <FormControl isInvalid={isErrorBirthday} paddingBottom={10}>
          <FormLabel fontWeight="bold">Birth Date</FormLabel>
          <Input
            value={birthdayDate}
            onChange={(e) => setBirthdayDate(e.target.value)}
            placeholder="Select Date and Time"
            type="date"
            border="1px"
            borderColor="gray.500"
            borderRadius="4px"
            w="100%"
            // w={550}
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
          {!isErrorBirthday  ? (<FormHelperText>
          Enter your last name.
        </FormHelperText>) : (<FormErrorMessage>Enter Birth Date.</FormErrorMessage>)}
        </FormControl>
        <Flex 
        alignItems="center"
        justifyContent="space-between"
        w="100%" 
        h="100%" 
        gap={5} 
        paddingBottom={10}>
            <Flex w="50%">
            <FormControl isInvalid={isErrorWeight}>
              <FormLabel fontWeight={"bold"}>Weight (kg)</FormLabel>
              <NumberInput
                value={weight}
                max={500.0}
                min={10.0}
                step={0.1}
                h={55}
                w="100%"
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
                  w="100%"
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
              {!isErrorWeight ? (
        <FormHelperText>
          Enter your weight.
        </FormHelperText>
      ) : (
        <FormErrorMessage>Weight is required and the minimal value is 10 kg.</FormErrorMessage>
      )}
            </FormControl>
           
          </Flex>
          <Flex w="50%">
            <FormControl isInvalid={isErrorHeight}>
              <FormLabel fontWeight={"bold"}>Height (m)</FormLabel>
              <NumberInput
                value={height}
                max={4.0}
                min={1.0}
                step={0.01}
                h={55}
                w="100%"
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
              {!isErrorHeight ? (
        <FormHelperText>
          Enter your height in meters.
        </FormHelperText>
      ) : (
        <FormErrorMessage>Height is required and the  value must be between 1 and 4 meters.</FormErrorMessage>
      )}
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
            w="100%"
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
        <FormControl isInvalid={isErrorPhone} paddingBottom={10}>
          <FormLabel fontWeight="bold">Phone number</FormLabel>
          <Input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter Phone Number"
            border="1px"
            borderColor="gray.500"
            borderRadius="4px"
            w="100%"
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
          {!isErrorPhone ? (
        <FormHelperText>
          Enter your phone number.
        </FormHelperText>
      ) : (
        <FormErrorMessage>Phone is required and the count of numbers must be 10.</FormErrorMessage>
      )}
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
            w="100%"
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
