import { Image } from '@mui/icons-material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ImageTRYPage = () => {

  const [img, setimg] = useState([])

  useEffect(() => {

    getData()

  }, [])

  // console.log(img);
  async function getData() {
    const responce = await axios.get('https://e18c-2405-201-200d-1034-6c4f-b97c-c591-f74a.ngrok.io/api/user/news');
    console.log(responce);
    setimg(responce)
  }

  //  const getdata = async () => {

  //     const res = await fetch("https://5050-2405-201-200d-1034-6c4f-b97c-c591-f74a.ngrok.io/api/user/news");
  //     const data = await res.json();
  //     console.log(data,res);
  //     // setimg(data?.result)
  //     // return data?.result
  //   }
  return (
    <div>ImageTRYPage

      ImageTRYPage
      ImageTRYPage
      <h1>ImageTRYPage If</h1>
      <h1>ImageTRYPage</h1>
      <h1>ImageTRYPage</h1>
      <h1>ImageTRYPage</h1>
      <h1>ImageTRYPage</h1>

      <img src={"https://e18c-2405-201-200d-1034-6c4f-b97c-c591-f74a.ngrok.io/uploads/1665492059535.jpg"} width="250px" />
      <img src={"https://5050-2405-201-200d-1034-6c4f-b97c-c591-f74a.ngrok.io/uploads/1665489529910.jpg"} width="250px" />

      {/* {img?.map((item) =>
        <>
          <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"} width="250px"
            height="180px" />
        </>
      )} */}

    </div>
  )
}

export default ImageTRYPage