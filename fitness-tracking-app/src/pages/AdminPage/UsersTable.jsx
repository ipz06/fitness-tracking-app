import { useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  VStack,
  Button,
  TableContainer,
  Input,
  FormControl,
  Image,
} from "@chakra-ui/react";
import AdminIcon from "./../../assets/icons8-microsoft-admin-64.png";
import OwnerIcon from "./../../assets/icons8-caretaker-30.png";
import { Link } from "react-router-dom";
import {
  IoChevronBackOutline,
  IoChevronForwardOutline,
  ImCross,
  ImCheckmark,
} from "react-icons/all";
import { updateUserRole } from "../../services/admin.service";
import { USER_TYPE } from "../../common/constants";

const UsersTable = ({ keys, users, items = 8, role }) => {
  const [itemsPerPage,setItemsPerPage] = useState(items)
  const [allUsers, setAllUsers] = useState(users);
  const [currentPage, setCurrentPage] = useState(0);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [uid, setUid] = useState("");
  const [searchUid, setSearchUid] = useState("");
  const [loading, setLoading] = useState(false);

  if (displayName !== "") {
    keys = keys.filter((key) => {
      if (key.toLowerCase().indexOf(displayName.toLowerCase()) !== -1) {
        return true;
      } else {
        return false;
      }
    });
  }

  if (searchEmail !== "") {
    keys = keys.filter((key) => {
      if (allUsers[key].email === searchEmail) {
        return true;
      } else {
        return false;
      }
    });
  }

  const handleSubmitMail = (e) => {
    e.preventDefault();
    setSearchEmail(email);
  };

  if (searchUid !== "") {
    keys = keys.filter((key) => {
      if (allUsers[key].uid === searchUid) {
        return true;
      } else {
        return false;
      }
    });
  }

  const handleSubmitUid = (e) => {
    e.preventDefault();
    setSearchUid(uid);
  };

  const pageCount = Math.ceil(keys.length / itemsPerPage);

  const currentKeys = keys.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(pageCount - 1, prev + 1));
  };

  const handleBlock = async (key) => {
    await updateUserRole(allUsers[key].handle, USER_TYPE.BLOCKED);
    setAllUsers({
      ...allUsers,
      [key]: {
        ...allUsers[key],
        role: USER_TYPE.BLOCKED,
      },
    });
  };

  const handleUnblock = async (key) => {
    await updateUserRole(allUsers[key].handle, USER_TYPE.USER);
    setAllUsers({
      ...allUsers,
      [key]: {
        ...allUsers[key],
        role: USER_TYPE.USER,
      },
    });
  };

  const setAdmin = async (key) => {
    await updateUserRole(allUsers[key].handle, USER_TYPE.ADMIN);
    setAllUsers({
      ...allUsers,
      [key]: {
        ...allUsers[key],
        role: USER_TYPE.ADMIN,
      },
    });
  };

  const removeAdmin = async (key) => {
    await updateUserRole(allUsers[key].handle, USER_TYPE.USER);
    setAllUsers({
      ...allUsers,
      [key]: {
        ...allUsers[key],
        role: USER_TYPE.USER,
      },
    });
  };

  if (loading) {
    return <div> Loading... </div>;
  }

  const renderButton = (role, key) => {
    if (role === USER_TYPE.BLOCKED) {
      return (
        <IconButton
          size={"xs"}
          colorScheme="red"
          isRound={true}
          icon={<ImCross />}
          onClick={() => handleUnblock(allUsers[key].handle)}
        />
      );
    } else if (role === USER_TYPE.ADMIN) {
      return (
        <Image
          src={AdminIcon}
          marginLeft={"2"}
          alt="logo"
          boxSize="30px"
          objectFit={"cover"}
        />
      );
    } else if (role === USER_TYPE.SUPER_ADMIN) {
      return (
        <Image
          src={OwnerIcon}
          marginLeft={"3"}
          alt="logo"
          boxSize="30px"
          objectFit={"cover"}
        />
      );
    } else {
      return (
        <IconButton
          size={"xs"}
          colorScheme="teal"
          isRound={true}
          icon={<ImCheckmark />}
          onClick={() => handleBlock(allUsers[key].handle)}
        />
      );
    }
  };

  const renderSetAdminButton = (role, userRole, key) => {
    if (role === USER_TYPE.SUPER_ADMIN && userRole !== USER_TYPE.ADMIN && userRole !== USER_TYPE.SUPER_ADMIN) {
      return (
        <Button
          colorScheme="teal"
          size={"xs"}
          variant="outline"
          onClick={() => setAdmin(allUsers[key].handle)}
        >
          setAdmin
        </Button>
      );
    } else if (role === USER_TYPE.SUPER_ADMIN && userRole === USER_TYPE.ADMIN && userRole !== USER_TYPE.SUPER_ADMIN) {
      return (
        <Button
          colorScheme="pink"
          size={"xs"}
          variant="outline"
          onClick={() => removeAdmin(allUsers[key].handle)}
        >
          notAdmin
        </Button>
      );
    }
  };

  return (
    <VStack>
      <TableContainer p={"4"}>
        <Table variant="striped" colorScheme="gray" width="100%" height="100%">
          <Thead>
            <Tr>
              <Th textAlign={"center"}>
                <Input
                  placeholder="Display Name"
                  size="sm"
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </Th>
              <Th textAlign={"center"}>
                <form onSubmit={handleSubmitMail}>
                  <FormControl>
                    <Input
                      placeholder="EMAIL"
                      size="sm"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>
                </form>
              </Th>
              <Th textAlign={"center"}>
                <form onSubmit={handleSubmitUid}>
                  <FormControl>
                    <Input
                      placeholder="ID"
                      size="sm"
                      value={uid}
                      onChange={(e) => setUid(e.target.value)}
                    />
                  </FormControl>
                </form>
              </Th>
              <Th textAlign={"center"}>Meals</Th>
              <Th textAlign={"center"}>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentKeys.map((key) => (
              <Tr fontSize={"small"} key={allUsers[key].uid}>
                <Td textAlign={"center"}>{allUsers[key].handle}</Td>
                <Td textAlign={"center"}>{allUsers[key].email}</Td>
                <Td textAlign={"center"}>{allUsers[key].uid}</Td>
                <Td textAlign={"center"}>
                  {" "}
                  <Link to={`/admin/${allUsers[key].handle}`}>
                    <Button colorScheme="yellow" size={"xs"}>
                      Meals
                    </Button>
                  </Link>
                </Td>
                <Td textAlign={"center"}>
                  {renderButton(allUsers[key].role, key)}
                </Td>
                <Td>{renderSetAdminButton(role, allUsers[key].role, key)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Box p={2} textAlign={"center"}>
          <IconButton
            onClick={handlePrevious}
            isDisabled={currentPage === 0}
            icon={<IoChevronBackOutline />}
            mr={2}
          />
          <Input
                value = {itemsPerPage}
                type={'number'}
                onChange={(e)=>setItemsPerPage(e.target.value)}
                size={'xs'}
                w={'33px'}
                textAlign={'center'}
                margin={'3'}/>
          <IconButton
            onClick={handleNext}
            isDisabled={currentPage === pageCount - 1}
            icon={<IoChevronForwardOutline />}
          />
        </Box>
      </TableContainer>
    </VStack>
  );
};

export default UsersTable;
