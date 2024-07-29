import { filesApi } from "@/app/helpers/api/filesAPI";
import ActionButton from "../../components/ActionButton";

export default function AddButton ({onClick}: {onClick: () => void}) {



return (
    <ActionButton type='button' onClick={onClick} className="w-[68px] h-[68px] flex items-center justify-center rounded-full p-0 bg-secondary group border border-transparent hover:border-rose  active:bg-rose transition-all duration-300 ease-in-out hover:cursor-custom-cursor" >
    <div className="group-hover:text-rose w-6 h-6 text-m text-white flex items-center justify-center group-active:text-white transition-all duration-300 ease-in-out">
+
</div>
    </ActionButton>
)
} 