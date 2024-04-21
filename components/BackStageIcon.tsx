import dynamic from 'next/dynamic'
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

export type BackStageIconName = keyof typeof dynamicIconImports;

interface IconProps extends LucideProps {
    name: BackStageIconName;
}

const BackStageIcon = ({ name, ...props }: IconProps) => {
    const LucideIcon = dynamic(dynamicIconImports[name])

    return <LucideIcon {...props} />;
};

export default BackStageIcon;
