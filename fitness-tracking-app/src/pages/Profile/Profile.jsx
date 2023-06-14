import {
  Flex,
  Box,
  Spinner,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Avatar,
  Text,
  Heading,
  Button,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import { logoutUser } from "../../services/auth.services";
import { AuthContext } from "../../common/context";
import { useNavigate } from "react-router-dom";
import { uploadAvatar } from "../../services/user.service";
import { getUserByHandle } from "../../services/user.service";
import { updateUserProfile } from "../../services/user.service";
import { countryList } from "../../common/countriesData";
import { toast } from "react-toastify";
import Badges from "../../components/Goals/Badges/Badges";
import { BiEdit } from "react-icons/bi";
import { modifyDate } from "../../common/helpFn";
import {
  isErrorFirstName,
  isErrorLastName,
  isErrorHeight,
  isErrorWeight,
  isErrorPhone,
  isErrorBirthday,
  isErrorGender,
} from "../../common/helpFn";
import { getUserAllFriends } from "../../services/friends.service";

const Profile = () => {
  const [image, setImage] = useState("");
  const [newImageData, setNewImageData] = useState(null);
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
  const [userHandle, setUserHandle] = useState("");
  const { user, handle, appState, setAppState } =
    useContext(AuthContext);
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [friendsCount, setFriendsCount] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchUser = async () => {
        try {
          const userSnapshot = await getUserByHandle(user.displayName);
          setFirstName(userSnapshot.firstName);
          setLastName(userSnapshot.lastName);
          setImage(userSnapshot.photoURL);
          setWeight(userSnapshot.weight);
          setHeight(userSnapshot.height);
          setPhoneNumber(userSnapshot.phone);
          setGender(userSnapshot.gender);
          setCountry(userSnapshot.country);
          setBirthdayDate(userSnapshot.birthDate);
          setCreatedOn(userSnapshot.createdOn);
          setUserHandle(userSnapshot.handle);
        } catch (error) {
          console.log(error);
        }
      };

      fetchUser();
    }
  }, [user]);

  const friendsCounting = async (handle) => {
    try {
      setLoading(true);
      const fetchFriendsCount = await getUserAllFriends(handle);
      setFriendsCount(fetchFriendsCount);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      friendsCounting(user.displayName);
    }
  }, [user]);

  const handleLogOut = () => {
    logoutUser()
      .then(() => navigate("/"));
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];

    if (!image.name.match(/\.(jpg|jpeg|png)$/)) {
      toast.warning("Select valid image!");
      return false;
    }

    setImage(URL.createObjectURL(image));
    setNewImageData(image);
    
  };

  const handleSave = async () => {
    setIsUploading(true);
    try {
      let avatarURL;
      if (newImageData) {
        avatarURL = await uploadAvatar(user.uid, newImageData);
        setAppState({ ...appState, photo: avatarURL, weight: weight });
      } else {
        setAppState({ ...appState, weight: weight });
      }

      if (!isErrorFirstName(firstName) 
      && !isErrorLastName(lastName)
      && !isErrorPhone(phoneNumber)
      && !isErrorWeight(weight)
      && !isErrorGender(gender)
      && !isErrorHeight(height)
      && !isErrorBirthday(birthdayDate))  {

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
          birthdayDate
        );

        toast.success("Your profile information is saved!", {
        autoClose: 500,
      });
      }

      else {
        toast.error(`You have to fill all the fields *!`, {
          autoClose: 500,
        });
      }
    } catch (error) {
      console.error("Error updating user avatar:", error);
      toast.warning(`You have to fill all the fields!`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Flex justifyContent="center" paddingX="16px" paddingTop="50px">
      <Flex direction="column" alignItems="center">
        <Heading
          size="xl"
          fontWeight="bold"
          fontStyle="normal"
          fontSize={{ base: "sm", sm: "xl", md: "3xl" }}
          paddingBottom={{base: 30 , md:50 }}
        >
          PROFILE INFORMATION
        </Heading>
        <Flex
          direction={{ base: "column", md: "row" }}
          paddingBottom={1}
          gap={10}
          justifyContent="space-between"
          w="100%"
        >
          <Box>
            <Flex flex="1" marginTop="2%">
              <FormControl
                display="flex"
                justifyContent="center"
                position="relative"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <Avatar //or box
                  className="avatar"
                  w="140px"
                  h="140px"
                  borderRadius="full"
                  src={image}
                  backgroundSize="cover"
                  backgroundPosition="center"
                  opacity={isHovering ? "0.5" : "1"}
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
                {isHovering && (
                  <Box
                    display="flex"
                    position="absolute"
                    top={["50%", "50%"]}
                    left="50%"
                    transform="translate(-50%, -50%)"
                    justifyContent="center"
                    alignItems="center"
                    backgroundColor="rgba(0,0,0,0.5)"
                    borderRadius="full"
                    w="140px"
                    h="140px"
                    pointerEvents="none"
                  >
                    <BiEdit size={24} color="white" />
                  </Box>
                )}
              </FormControl>
            </Flex>
          </Box>
          <Flex flex="2" flexDir="column" w="100%" marginTop={5}>
            <Text
              fontWeight="bold"
              fontStyle="normal"
              fontSize={{ base: "xs", sm: "sm", md: "lg" }}
              paddingBottom={{ base: 1, md: 5 }}
            >
              Username: {userHandle}
            </Text>
            <Text
              fontWeight="bold"
              fontStyle="normal"
              fontSize={{ base: "xs", sm: "sm", md: "lg" }}
              paddingBottom={{ base: 1, md: 5 }}
            >
              Member since: {modifyDate(createdOn)}
            </Text>
            <Text
              fontWeight="bold"
              fontStyle="normal"
              fontSize={{ base: "xs", sm: "sm", md: "lg" }}
              paddingBottom={{ base: 1, md: 5 }}
            >
              Friends: {friendsCount.length}
            </Text>
            <Text
              fontWeight="bold"
              fontStyle="normal"
              fontSize={{ base: "xs", sm: "sm", md: "lg" }}
              paddingBottom={{ base: 1, md: 5 }}
            >
              Achievements
            </Text>
            <Flex>
              <Badges handle={handle} />
            </Flex>
          </Flex>
        </Flex>
        <Flex w="100%" justifyContent={"center"}>
          <FormControl
            maxW="450px"
            isInvalid={isErrorFirstName(firstName)}
            paddingBottom={10}
          >
            <FormLabel fontWeight="bold"> First Name *</FormLabel>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter First Name"
              border="1px"
              borderColor="gray.500"
              borderRadius="4px"
              size="lg"
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
            {!isErrorFirstName(firstName) ? (
              <FormHelperText>Enter your first name.</FormHelperText>
            ) : (
              <FormErrorMessage>
                Name is required and the length must be greater than 1 symbol.
              </FormErrorMessage>
            )}
          </FormControl>
        </Flex>
        <FormControl
          maxW="450px"
          isInvalid={isErrorLastName(lastName)}
          paddingBottom={10}
        >
          <FormLabel fontWeight="bold">Last Name *</FormLabel>
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter Last Name"
            border="1px"
            borderColor="gray.500"
            borderRadius="4px"
            size="lg"
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
          {!isErrorLastName(lastName) ? (
            <FormHelperText>Enter your last name.</FormHelperText>
          ) : (
            <FormErrorMessage>
              Name is required and the length must be greater than 1 symbol.
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl
          maxW="450px"
          isInvalid={isErrorBirthday(birthdayDate)}
          paddingBottom={10}
        >
          <FormLabel fontWeight="bold">Birth Date *</FormLabel>
          <Input
            value={birthdayDate}
            onChange={(e) => setBirthdayDate(e.target.value)}
            placeholder="Select Date and Time"
            type="date"
            border="1px"
            borderColor="gray.500"
            borderRadius="4px"
            size="lg"
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
          {!isErrorBirthday(birthdayDate) ? (
            <FormHelperText>Enter your Birth Date.</FormHelperText>
          ) : (
            <FormErrorMessage>Enter Birth Date.</FormErrorMessage>
          )}
        </FormControl>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          maxWidth="450px"
          h="100%"
          gap={5}
          paddingBottom={10}
        >
          <Flex w="50%">
            <FormControl isInvalid={isErrorWeight(weight)}>
              <FormLabel fontWeight={"bold"}>Weight (kg) *</FormLabel>
              <NumberInput
                value={weight}
                max={500.0}
                min={10.0}
                step={1}
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
              </NumberInput>
              {!isErrorWeight(weight) ? (
                <FormHelperText>Enter your weight.</FormHelperText>
              ) : (
                <FormErrorMessage>
                  Weight is required and the value must be between 10 and 500 kg.
                </FormErrorMessage>
              )}
            </FormControl>
          </Flex>
          <Flex w="50%">
            <FormControl isInvalid={isErrorHeight(height)}>
              <FormLabel fontWeight={"bold"}>Height (cm) *</FormLabel>
              <NumberInput
                value={height}
                max={300}
                min={50}
                step={1}
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
              </NumberInput>
              {!isErrorHeight(height) ? (
                <FormHelperText>Enter your height.</FormHelperText>
              ) : (
                <FormErrorMessage>
                  Height is required and the value must be between 50 and 300 cm.
                </FormErrorMessage>
              )}
            </FormControl>
          </Flex>
        </Flex>
        <FormControl
          maxW="450px"
          isInvalid={isErrorGender(gender)}
          paddingBottom={10}
        >
          <FormLabel fontWeight="bold">Gender *</FormLabel>
          <Select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder="Select gender"
            border="1px"
            borderColor="gray.500"
            borderRadius="4px"
            size="lg"
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
          {!isErrorGender(gender) ? (
            <FormHelperText>Select gender.</FormHelperText>
          ) : (
            <FormErrorMessage>Enter Gender.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl
          maxW="450px"
          isInvalid={isErrorPhone(phoneNumber)}
          paddingBottom={10}
        >
          <FormLabel fontWeight="bold">Phone number *</FormLabel>
          <Input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter Phone Number"
            border="1px"
            borderColor="gray.500"
            borderRadius="4px"
            size="lg"
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
          {!isErrorPhone(phoneNumber) ? (
            <FormHelperText>Enter your phone number.</FormHelperText>
          ) : (
            <FormErrorMessage>
              Phone is required, please enter a phone number.
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl maxW="450px" paddingBottom={10}>
          <FormLabel fontWeight="bold">Country</FormLabel>
          <Select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Select country"
            border="1px"
            borderColor="gray.500"
            borderRadius="4px"
            size="lg"
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
            {countryList.map((el, i) => (
              <option key={i}>{el}</option>
            ))}
          </Select>
        </FormControl>
        <Flex paddingBottom={10} gap={10} justifyContent={"space-between"}>
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
