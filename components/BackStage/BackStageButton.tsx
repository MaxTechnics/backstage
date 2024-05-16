'use client';
import { Box, Card, Flex, Avatar, Text } from '@radix-ui/themes';
import BackstageButtonStyles from './BackStageButton.module.scss';
import React from 'react';
import BackStageIcon, { type BackStageIconName } from '../BackStageIcon';

type BackStageButtonProps = {
    title: string;
    // trigger: () => void;
    trigger: string;
    icon?: BackStageIconName;
    onClick: () => void;
};

const BackStageButton = ({ title, trigger, icon = 'zap', onClick }: BackStageButtonProps) => {
    const handleClick = () => {
        // trigger();
        console.log(trigger);
    };

    return (
        // <button style={{ borderRadius: '50%' }} onClick={handleClick}>
        //     {title}
        // </button>
        <Box style={{ maxWidth: '240px' }} className={BackstageButtonStyles['card']} onClick={onClick}>
            <Card>
                <div className={BackstageButtonStyles['overlay']}><BackStageIcon name='zap' />Click to trigger</div>
                <Flex gap="3" align="center">
                    {/* <Avatar
                        size="3"
                        src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                        radius="full"
                        fallback="T"
                    /> */}
                    <BackStageIcon name={icon} size={48} color='#8E4EC6' /> {/* radix Purple 9 */}
                    <Box>
                        <Text as="div" size="2" weight="bold" color='gray'>
                            {title}
                        </Text>
                        <Text as="div" size="2" color="gray">
                            Engineering
                        </Text>
                    </Box>
                </Flex>
            </Card>
        </Box >
    );
};

export default BackStageButton;
