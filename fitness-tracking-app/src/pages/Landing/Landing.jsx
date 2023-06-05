import {  Button, Flex, Text } from '@chakra-ui/react';
import video from '../../assets/video.mp4'
import logoWhite from '../../assets/logo-white.png'
import { redColor } from '../../common/constants';
import { WHITE_COLOR } from '../../common/constants';
import { NavLink } from 'react-router-dom';

const Landing = () => {

    return (
        <Flex
            position='relative'
            w='100vw'
            h='100vh'
            alignItems='center'
            justifyContent='center'
        >
            <Flex
                flexDir='column'
                alignItems='center'
                zIndex={2}
            >
                <img src={logoWhite} width='300px' />
                <Text 
                fontStyle="normal"
                fontWeight="bold"
                marginBottom='100px' color={WHITE_COLOR}>
                    Welcome
                </Text>
                <NavLink to='signup'>
                <Button
                    marginBottom='50px' 
                    w={'250px'}
                    h={'50px'}
                    color={redColor}
                >
                    GET FIT
                </Button>
             </NavLink>
             <NavLink to='login'>
                <Text 
                    fontStyle="normal"
                    marginBottom='50px' 
                    color={WHITE_COLOR}
                    _hover={{
                        color: '#e0041c'
                    }}>
                    Already have an account? Login
                </Text>
             </NavLink>
             <Text 
                    fontStyle="normal"
                    marginBottom='50px' 
                    color={WHITE_COLOR}
                    >
                    Active Users: 
                </Text>
                
             {/* <Flex w='100%' h='60px'>
                <Flex flex="1" backgroundColor='coral' />
                <Flex flex="1" backgroundColor='yellow' />
             </Flex> */}
            </Flex>
            <Flex as='video' src={video} autoPlay muted loop position='fixed' top='0' left='0' w='100%' h='100%' objectFit='cover' filter='grayscale(100%)' />
        </Flex>
    )
}

export default Landing;