import { Box, Flex, Text } from '@chakra-ui/react';
import video from '../../assets/video.mp4'

const Landing = () => {

    return (
        <Flex 
        w='100%'
        h='100vh'>
            <Box 
            w='100%'
            h='100vh'
            filter='grayscale(80%)'
            objectFit={'cover'}>
                <video src={video} autoPlay loop muted/>
                <Text 
                position={'absolute'}
                w='100%'
                h='100%'
                top={0}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                color={'white'}
                >Welcome</Text>
            </Box>
        </Flex>
    )
}

export default Landing;