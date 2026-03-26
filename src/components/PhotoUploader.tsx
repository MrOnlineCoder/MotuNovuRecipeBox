import { delay, fileToBase64Url } from "@/lib/utils"
import { UploadIcon } from "lucide-react"
import { useRef, useState } from "react"

export const PhotoUploader: React.FC<{
    photoUrl: string | null
    onUploaded: (url: string) => void
}> = ({ photoUrl, onUploaded }) => {
    const uploadInputRef = useRef<HTMLInputElement>(null)

    const [busy, setBusy] = useState(false)

    const onFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (busy) return;

        setBusy(true)

        await delay(1000);

        const file = e.target.files?.[0];

        if (file) {
            //TODO: in production, switch to real server-side upload
            const url = await fileToBase64Url(file);

            onUploaded(url);
        }

        setBusy(false)
    }

    const showUploadUI = () => {
        if (uploadInputRef.current && !busy) {
            uploadInputRef.current.click();
        }
    }

    return <div className="w-full h-48 rounded-sm bg-secondary flex justify-center items-center cursor-pointer relative" onClick={showUploadUI}>
        {!!photoUrl && <img src={photoUrl} alt="Uploaded photo" className="object-cover w-full h-full rounded-sm" />}

        <input ref={uploadInputRef} type="file" className="hidden" accept="image/*" onChange={onFileSelected} />
        <div className="rounded-sm flex items-center justify-center gap-1 absolute py-2 px-6 bg-secondary/90">
            <UploadIcon size={16} />
            {busy ? 'Uploading...' : 'Upload photo'}
        </div>
    </div>
}