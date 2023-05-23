import { Box, Button, Flex, Text } from '@chakra-ui/react';
import video from '../../assets/video.mp4'
import logoWhite from '../../assets/logo-white.png'
import { redColor } from '../../common/constants';
import { NavLink } from 'react-router-dom';

const Landing = () => {

    return (
        <Flex 
        w='100%'
        h='100vh'>
            <Box 
            w='100%'
            h='100vh'
            filter='grayscale(100%)'
            objectFit={'cover'}>
                <video src={video} autoPlay loop muted/>
            </Box>
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
                marginTop={200}
                >Welcome </Text>
            <Box
            position={'absolute'}
            maxW={'sm'}
            h='100%'
            top={0}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            paddingLeft={'50'}
            marginLeft={400}
            marginTop={100}
            color={'white'}
            >
            <img src={logoWhite} color='white' />
            </Box>
           {/* <NavLink to='profile'> */}
            <Button
             position={'absolute'}
             w={'250px'}
             h={'50px'}
             top={0}
             display={'flex'}
             flexDirection={'column'}
             justifyContent={'center'}
             alignItems={'center'}
             marginLeft={525}
             marginTop={650}
             color={redColor}
            >GET FIT
            </Button>
            {/* </NavLink> */}
        </Flex>
    )
}

export default Landing;