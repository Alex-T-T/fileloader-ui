import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    isMainTitle?: boolean;
    className?: string;
};

export const Title = ({ children, isMainTitle = false, className }: Props) => {
    if (isMainTitle)
        return (
            <h1
                className={`text-2xl leading-[1.5] tracking-[-0.64px] desktop:text-4xl desktop:tracking-[-1.44px] ${className}`}
            >
                {children}
            </h1>
        );

    return (
        <h2
            className={` text-3xl leading-[1.3] tracking-[-0.8px] desktop:text-4xl desktop:leading-[1.5] desktop:tracking-[-1.44px] ${className}`}
        >
            {children}
        </h2>
    );
};
