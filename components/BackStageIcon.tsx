import dynamic from 'next/dynamic'
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import React from 'react';

export type BackStageIconName = keyof typeof dynamicIconImports;

interface IconProps extends LucideProps {
    name: BackStageIconName;
}

const BackStageIconComp = ({ name, ...props }: IconProps) => {
    const LucideIcon = dynamic(dynamicIconImports[name])

    return <LucideIcon {...props} />;
};

const BackStageIcon = React.memo(BackStageIconComp);

export default BackStageIcon;
