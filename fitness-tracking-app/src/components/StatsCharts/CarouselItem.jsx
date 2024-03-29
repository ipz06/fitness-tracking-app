import { Flex, Image, Text } from "@chakra-ui/react";
import useMealImages from "../../hooks/useMealImages";
import upload from "../../assets/upload.png";
import { ICON_SIZE_BIGGER } from "../../common/constants";

const CarouselItem = (meal) => {
  const imageMeal = useMealImages(meal.typeMeal);

  return (
    <Flex direction="column" alignItems="center">
      <Flex marginTop={5} marginBottom={5}>
        <Image
          borderRadius="full"
          src={imageMeal ? imageMeal : upload}
          boxSize={ICON_SIZE_BIGGER}
          className="image"
        />
      </Flex>
      <Flex direction="column">
        <Flex>
          <Text fontStyle="normal" fontWeight="bold">
            Title:
          </Text>
          <Text fontStyle="normal">{meal.title}</Text>
        </Flex>
        <Flex>
          <Text fontStyle="normal" fontWeight="bold">
            Cal:{" "}
          </Text>
          <Text fontStyle="normal">{meal.calories}</Text>
        </Flex>
        <Flex>
          <Text fontStyle="normal" fontWeight="bold">
            Type:
          </Text>
          <Text fontStyle="normal">
            {meal.typeMeal ? meal.typeMeal : "None"}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CarouselItem;
