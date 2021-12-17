import React=require('react');
import {useState} from 'react';
import styled from 'styled-components';
import {AiFillCamera} from 'react-icons/ai'
import {MdDeleteForever} from 'react-icons/md'
import { storage } from './firebase';

export interface UploadableFile {
    file: File;
    // errors: FileError[];
    url?: string;
  }

export default function RMFU() {

    const [files, setFiles] = useState<UploadableFile[]>([]);

    //Params from other page
  
    const [data, setData] = useState<any>({
     
      images: [],
    
    });
    const [fileType, setFileType] = useState("jpeg");
    const [progr, setProgr] = useState<any>(100);
  
    const [photoErrorDesc, setPhotoErrorDesc] = useState<string>("");
    const [photoError, setPhotoError] = useState<boolean>(false);
    const [images, setImages] = useState<any>([]);
    const [urls, setUrls] = useState<any>([]);
    const [isReady, setIsReady] = useState(true);


    const handleChangeImg = (e: any) => {
        for (let i = 0; i < e.target.files.length; i++) {
          const newImage = e.target.files[i];
          setImages((prevState: any) => [...prevState, newImage]);
        }
      };

      const uploadPhoto = (base64: any) => {
        const random = "bAg" + Math.random();
        return storage
          .ref("companies/" + random + "/")
          .child("photo")
          .putString(base64, "base64", { contentType: fileType });
      };

      const setAndPrepare = (e: any) => {
        for (let i = 0; i < e.target.files.length; i++) {
          console.log("ssdsd", e.target.files[i]);
          let reader = new FileReader();
          reader.onload = function (a: any) {
            const result = a.target.result;
            let type = result.split(",")[0];
            setFileType(type.includes("jpeg") ? "jpeg" : "png");
    
            let base64 = result.split(",")[1];
            if (!type.includes("jpeg") && !type.includes("png")) {
              console.log("Tente fazer upload de um arquivo .JPEG ou PNG");
            } else {
              const uploadTask = uploadPhoto(base64);
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  let progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100; // Must change the way the value its showed
                  console.log("Upload is " + progress + "% done");
                  if (progress < 100) {
                    console.log("carregando");
                    setProgr(progress);
                  } else {
                    console.log("carregada");
                    setProgr(progress);
                  }
                },
                (err) => {
                  console.log(err.message);
                },
                async () => {
                  const downloadURL =
                    await uploadTask.snapshot.ref.getDownloadURL();
                  console.log("Image download link   novo: ", downloadURL);
    
                  setData((prevState: any) => ({
                    ...prevState,
                    images: [...prevState.images, downloadURL],
                  }));
    
                  setUrls((prevState: any) => [...prevState, downloadURL]);
                }
              );
            }
          };
          reader.readAsDataURL(e.target.files[i]);
        }
      };

    return (
        <div >
        <div>
    
        
                          <div className="dropzone">
                            {data.images.map((url: any, i: any) => (
                              <div>
                                <img
                                  key={i}
                                  style={{
                                    width: "100px",
                                    paddingLeft: "5px",
                                    paddingBottom: "15px",
                                  }}
                                  src={url || "http://via.placeholder.com/300"}
                                  alt="firebase-image"
                                />
                                <div className="remove">
                                  <div >
                                    <IconButton
                                      color="primary"
                                      aria-label="delete"
                                      onClick={() => {
                                        console.log(i);
                                        const array = data.images;
    
                                        const finalArray = [] as any;
                                        array.map((element: any, index: any) => {
                                          index !== i
                                            ? finalArray.push(element)
                                            : console.log(i, "- >>>>>> Removed");
                                        });
                                        console.log(finalArray);
                                        setData((prevState: any) => ({
                                          ...prevState,
                                          images: finalArray,
                                        }));
                                        console.log(data.images);
                                        // array.
                                      }}
                                    >
                                      <MdDeleteForever />
                                    </IconButton>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
    
                          <label id="foto">
                            <TextField
                              type="file"
                              error={photoError}
                              required
                              InputLabelProps={{
                                shrink: true,
                                color: "primary",
                              }}
                              style={{ display: "none" }}
                              id="event-img"
                              name="event-img"
                              label="Imagem do evento"
                              variant="outlined"
                              inputProps={{ multiple: true }}
                              helperText={photoErrorDesc}
                              onChange={(e) => {
                                // setData({ ...data, images: [] });
                                handleChangeImg(e);
                                setAndPrepare(e);
                              }}
                            />
                            <p>
                              {" "}
                              <AiFillCamera />
                            </p>
                          </label>
                        </div>
    
        </div>
    )
}


export const IconButton =styled.button`


`

export const TextField =styled.input`
border: ${({error})=> error && '1px solid red' }; 

`