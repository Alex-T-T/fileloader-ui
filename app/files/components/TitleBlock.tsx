import { Text } from '@/app/components/Text';
import { Title } from '@/app/components/Title';

export default function TitleBlock() {
    return (
        <section className="w-full flex items-start flex-col gap-1 mb-6">
            <Text className="text-white text-xs">Files</Text>
            <Title isMainTitle className="text-left text-white text-[32px]">
                Dashboard
            </Title>
        </section>
    );
}
