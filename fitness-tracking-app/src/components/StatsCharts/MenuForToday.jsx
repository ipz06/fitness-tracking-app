import { Button, Card } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../common/context";
import { useState } from "react";

const MenuForToday = () => {

    return (
        <Card
          h={{ base: "200px", md: "300px", lg: "400px" }}
          w={{ base: "400px", md: "2xl", lg: "3xl" }}
          marginX={"auto"}
          >           
        </Card>
    )
}

export default MenuForToday;