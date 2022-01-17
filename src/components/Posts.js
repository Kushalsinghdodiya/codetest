import React, { useState } from 'react';
import './post.css';


export default function Posts() {

    const [userData, setuserData] = useState({
        msg: '',
        media: ''
    });
    const [listPost, setlistPost] = useState([]);
    const [gifInput, setGifInput] = useState('');
    const [gifStream, setGifStream] = useState([]);


    //GETTING DEFAULT GIF (TRENDING)
    const onGifClick = async () => {

        let trendingUrl = 'https://api.giphy.com/v1/gifs/trending?api_key=RMMmbP35M6Fr10HLpi4BC0VSsYfJEgal&limit=20&rating=g';
        let responseArray = [];
        const fetchApi = await fetch(trendingUrl);
        const responseData = await fetchApi.json();
        responseArray.push(...responseData.data);
        responseArray.map(dt => gifStream.push(dt.images.original.url));
        setGifStream([...gifStream]);
    }


    //FUNCTION POST MESSAGE
    const postMsg = () => {

        if (userData !== '') {
            listPost.push(userData);
            setlistPost([...listPost]);
            setuserData({
                msg: '',
                media: ''
            })
        }
    }

    //SEARCH FOR GIF FUNCTION

    const handleGifApi = async (inputStream) => {
        let apiInput = inputStream;
        let APIKEY = 'RMMmbP35M6Fr10HLpi4BC0VSsYfJEgal';
        setGifInput(apiInput);


        if (apiInput !== '') {
            try {
                // setTimeout(async()=>{

                // },3000)
                gifStream.length = 0;
                let EndPoint = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${apiInput.trim()}&limit=10&offset=0&rating=g&lang=en`;
                let responseArray = [];

                const fetchApi = await fetch(EndPoint);
                const responseData = await fetchApi.json();
                responseArray.push(...responseData.data);

                responseArray.map(dt => {
                    gifStream.push(dt.images.original.url);
                })
                setGifStream([...gifStream]);

            } catch (err) {
                console.log(err);
            }
        } else {
            onGifClick()
        }
    }


    //FUNCTION FOR SELECTED GIF 
    const handleGifInput = (gifurl) => {
        setuserData({ msg: userData.msg, media: gifurl });
        setGifInput('');

    }


    return (
        <div className='container h-100'>


            <div className="write_post_container mt-5">
                <div className='user_profile'>
                    <img src="https://az360.school/public/files/users/full/b52e290c_free-profile-photo-whatsapp-4.png" />
                    <div>
                        <p>Kushal Singh</p>
                        <small>Public</small>
                    </div>
                </div>


                <div className="post_input_container">
                    <textarea value={userData.msg} onChange={(e) => setuserData({ msg: e.target.value, media: userData.media })} rows={4} placeholder='Whats on Your mind, Kushal ?'></textarea>

                    <div>
                        <img src={userData.media} className="selected_gif" />
                    </div>

                    <div className=" mt-2 post_action d-flex justify-content-between align-items-center">

                        <div className="add_post_links">
                            <button onClick={onGifClick} className="btn btn_gif badge badge-pill badge-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-plus ml-1 mr-1"></i>GIF</button>
                            <div className="dropdown-menu mt-2">
                                <div className="row m-0">
                                    <div className='col-12 pr-3 pl-3'>
                                        <input type="text" className="form-control" placeholder='Search gif' defaultValue={gifInput} onKeyUp={(e) => handleGifApi(e.target.value)} onChange={(e) => handleGifApi(e.target.value)} />
                                    </div>
                                </div>

                                <div className='row m-0 pr-3 pl-3  pt-3'>

                                    {gifStream.map((dt, index) => {
                                        return <div className="col-6 single_gif" key={index}>
                                            <div>
                                                <a onClick={() => handleGifInput(dt)}>
                                                    <img className='gif_image' src={dt} />
                                                </a>
                                            </div>
                                        </div>
                                    })}





                                </div>
                            </div>
                        </div>


                        <button type="button" className="btn btn-primary" onClick={postMsg}>Post</button>

                    </div>
                </div>


            </div>




            {listPost.slice(0).reverse().map((dt, index) => {
                return <div className="post_container mb-2" key={index}>
                    <div className='user_profile'>
                        <img src="https://az360.school/public/files/users/full/b52e290c_free-profile-photo-whatsapp-4.png" />
                        <div>
                            <p>Kushal Singh</p>
                            <span>June 24 2021, 12:01pm</span>
                        </div>
                    </div>

                    <p className="post_text">

                        <span>{dt.msg}</span>

                    </p>

                    {dt.media !== undefined && <img src={dt.media} className="post_img" />}
                </div>
            })}

        </div>
    )
}
