'use client'
import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from './ui/progress';
import empty from '@/public/empty.svg'

interface FileWithPreview extends File {
    preview: string;
}

interface FileCardProps {
    file: FileWithPreview;
    onRemove: () => void;
}

function FileCard({ file, onRemove }: FileCardProps) {
    function formatBytes(bytes: number) {
        const sizes = ["KB", "MB"];
        if (bytes === 0) return "0 KB";
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${(bytes / Math.pow(1024, i)).toFixed(0)} ${sizes[i - 1] ?? "Bytes"}`;
    }

    return (
        <div className="relative flex items-center space-x-4">
            <div className="flex flex-1 space-x-4">
                <Image
                    src={file.preview}
                    alt={file.name}
                    width={48}
                    height={48}
                    className="aspect-square shrink-0 rounded-md object-cover"
                />
                <div className="flex w-full flex-col gap-2">
                    <div className="space-y-px">
                        <p className="line-clamp-1 text-sm font-medium text-foreground/80">
                            {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {formatBytes(file.size)}
                        </p>
                    </div>
                    <Progress value={100}/>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="size-7"
                    onClick={onRemove}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15">
                        <path fill="currentColor" fillRule="evenodd" d="M11.782 4.032a.575.575 0 1 0-.813-.814L7.5 6.687L4.032 3.218a.575.575 0 0 0-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 0 0 .814.814L7.5 8.313l3.469 3.469a.575.575 0 0 0 .813-.814L8.313 7.5z" clipRule="evenodd" className="size-4" aria-hidden="true" />
                    </svg>
                    <span className="sr-only">Remove file</span>
                </Button>
            </div>
        </div>
    )
}

export default function ImageUploadClient() {
    const [files, setFiles] = useState<FileWithPreview[]>([]);

    const processFiles = useCallback((inputFiles: File[]) => {
        const newFiles = inputFiles.filter(file => file.type.startsWith('image/')).map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file)
            })
        );
        setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files);
        processFiles(droppedFiles);
    }, [processFiles]);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            processFiles(selectedFiles);
        }
    }, [processFiles]);

    const handleRemoveFile = useCallback((indexToRemove: number) => {
        setFiles(prevFiles => {
            const newFiles = prevFiles.filter((_, index) => index !== indexToRemove);
            URL.revokeObjectURL(prevFiles[indexToRemove].preview);
            return newFiles;
        });
    }, []);

    return (
        <Card className="bg-black text-white shadow-lg">
            <CardContent className="p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Drag & Drop Area */}
                    <div
                        className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center h-[400px] flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        onClick={() => document.getElementById('file-upload')?.click()}
                    >
                        <div className='text-gray-400 mb-2 break-all'>
                        <img src="/upload.png" alt="Upload Icon" className="w-50 h-50" draggable="false" />

                        <p className="">Drag &amp; drop</p>
                        <p className="">or</p>
                        </div>
                        <Input
                            id="file-upload"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <Button type="button" variant="secondary" size="sm">
                            Select Files
                        </Button>
                    </div>

                    {/* Preview Area */}
                    <Card className="bg-black text-white h-[400px]">
                        <ScrollArea className="h-full p-4">
                            {files.length > 0 ? (
                                <div className="space-y-4 ">
                                    {files.map((file, index) => (
                                        <FileCard
                                            key={file.name + index}
                                            file={file}
                                            onRemove={() => handleRemoveFile(index)}
                                        />
                                    ))}
                                </div>
                            ) : (
                            <div className="pt-12">
                                <Image src={empty.src} width={100} height={100} alt="No Files" className="w-full" draggable={false} />
                                <p className='text-center'>No Files here</p>
                            </div>
                            )}
                        </ScrollArea>
                    </Card>
                </div>
            </CardContent>
        </Card>
    );
}