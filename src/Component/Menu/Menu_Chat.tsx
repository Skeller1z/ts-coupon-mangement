import React, { ChangeEvent, useRef, useState } from "react";
import {
    HubConnection,
    HubConnectionBuilder,
    LogLevel,
} from "@microsoft/signalr";
import axios, { AxiosProgressEvent, CancelTokenSource } from "axios";
import { v4 as uuidv4 } from "uuid";
import Lobby from "../MainPage/Lobby";
import Chat from "../MainPage/Chat";
export interface DataFile {
    [id: string]: {
        id: string;
        file: File;
        progress: number;
        status: number; //0 wait, 1 uploading, 2 faile, 3 success
        cancelToken: CancelTokenSource;
        estimated?: number;
    };
}
export default function Menu_Chat(props) {
    //------------------------------------------- ตัวแปร ------------------------------------------
    const [showchat, setshowchat] = useState(false);
    const [connection, setConnection] = useState<HubConnection | null>();
    const [messages, setMessages] = useState<any>([]);
    const [users, setUsers] = useState<any>([]);
    const [files, setFiles] = useState<DataFile[]>([]);
    const inputRef = useRef<any>(null);
    //------------------------------------------- onload ------------------------------------------
    //------------------------------------------- funtion ------------------------------------------
    const joinRoom = async (user: string, room: string) => {
        try {
            const connection: HubConnection = new HubConnectionBuilder()
                // .withUrl("http://localhost:5101/chat")
                .withUrl("http://sev1.bsv-th-authorities.com/hub/chat")
                .configureLogging(LogLevel.Information)
                .build();

            connection.on("UsersInRoom", (user) => {
                setUsers(user);
            });

            connection.on(
                "ReceiveMessage",
                (user: string, message: string, cur: string, type: string) => {
                    console.log("message received: ", message);
                    if (connection.connectionId !== cur || type === "img") {
                        setMessages((messages: any) => [
                            ...messages,
                            {
                                user,
                                message,
                                cur: type === "img" && connection.connectionId === cur ? 1 : 0,
                            },
                        ]);
                    }
                }
            );

            connection.onclose((e) => {
                setConnection(null);
                setMessages([]);
                setUsers([]);
            });

            await connection.start();

            await connection.invoke("joinRoom", { user, room });
            console.log(connection);
            setConnection(connection);
        } catch (error) {
            console.log(error);
        }
    };
    const closeConnection = async () => {
        try {
            await connection?.stop();
        } catch (error) {
            console.log(error);
        }
    };
    const sendMessage = async (message: any) => {
        try {
            await connection?.invoke("SendMessage", message);
            setMessages((messages: any) => [
                ...messages,
                { user: "", message, cur: 1 },
            ]);
        } catch (error) {
            console.log(error);
        }
    };
    {/*const handleUpload = async (fileData: DataFile, index: number) => {
        const formData: any = new FormData();
        const { file, id, cancelToken } = Object.values(fileData)[0];
        formData.append("files", file);
        formData.append("ConnectionId", connection?.connectionId);

        let TempFile: DataFile[] = files;
        TempFile[index][id].status = 1; //changStatus
        const res = await axios
            // http://localhost:5101/api/Upload
            // http://sev1.bsv-th-authorities.com/hub/api/Upload
            .post("http://localhost:5101/api/Upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                cancelToken: cancelToken.token,
                onUploadProgress(progressEvent: AxiosProgressEvent) {
                    if (progressEvent?.progress && progressEvent?.total) {
                        let percen = Math.round(100 * progressEvent.progress);

                        TempFile[index][id].progress = percen;
                        TempFile[index][id].estimated = progressEvent.estimated || 0;
                        setFiles([...TempFile]);
                    }
                },
            })
            .catch((error) => {
                if (axios.isCancel(error)) {
                    // Do something when user cancel upload
                    TempFile[index][id].status = 2;
                    setFiles([...TempFile]);
                    console.log(error.message);
                }
            });

        if (res?.status === 200) {
            TempFile[index][id].status = 3;
            setFiles([...TempFile]);
        }
    };*/}
    const handleSelectFiles = (e: ChangeEvent<HTMLInputElement>) => {
        const file: FileList | null = e.currentTarget.files;

        if (file) {
            console.log(file);

            let tempData: DataFile[] = Array.from(file).map((file: File) => {
                // let uuid = crypto.randomUUID();
                let uuid = uuidv4();
                const CancelToken = axios.CancelToken;
                const source = CancelToken.source();
                return {
                    [uuid]: {
                        id: uuid,
                        progress: 0,
                        file,
                        status: 0,
                        cancelToken: source,
                    },
                };
            });
            // console.log(Object.keys(tempData[0])[0]);
            // console.log(tempData);
            // setFiles(Array.from(file).map((file: File) => Object.assign(file)));
            setFiles(tempData);
        }
    };
    const handleRemoveFile = (iid: string) => {
        const filtered = files.filter(
            (i: DataFile) => Object.keys(i)[0].toString() !== iid
        );
        setFiles([...filtered]);
    };
    //------------------------------------------- html ------------------------------------------
    return (
        <>
            <button className={!showchat ? "fixed bottom-0 right-0 w-[150px] h-8 rounded-sm bg-black text-white text-xl hover:bg-black" : "hidden"}
                onClick={() => { setshowchat(!showchat) }}
            ><i className="far fa-comment-alt-lines"></i></button>
            <div className={!showchat ? "hidden" : "h-[auto] w-[400px] z-10 border fixed bottom-0 right-0 bg-white rounded-lg"}>
                <div className="grid grid-cols-12 gap-5">
                    <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center">
                        <div className="grid grid-cols-12 bg-black text-white p-3 text-lg rounded-tl-lg rounded-tr-lg">
                            <div className="grid col-span-8 content-center">
                                <div className="font-semibold">Chat</div>
                            </div>
                            <div className="grid col-span-4 justify-self-end">
                                <i className="fal fa-times text-end text-2xl py-1 px-2 hover:bg-gray-600 rounded-md cursor-pointer" onClick={() => { setshowchat(!showchat) }}></i>
                            </div>
                            <div className="grid col-span-12">
                                {!connection ? (
                                    <Lobby joinRoom={joinRoom} />
                                ) : (
                                    <Chat
                                        messages={messages}
                                        sendMessage={sendMessage}
                                        closeConnection={closeConnection}
                                        users={users}
                                        //handleUpload={handleUpload}
                                        files={files}
                                        handleSelectFiles={handleSelectFiles}
                                        handleRemoveFile={handleRemoveFile}
                                        inputRef={inputRef}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
