import React, { useState } from 'react'
import Load from './Load';



function Test() {

  const [isLoadingpopup, setisLoadingpopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const hotel = {
    data: [
      {
        id: 1,
        img: "https://images.trvl-media.com/lodging/16000000/15620000/15617200/15617176/248f37ce.jpg?impolicy=resizecrop&rw=500&ra=fit",
        text: "โรงแรม 1"
      },
      {
        id: 2,
        img: "https://sls-prod.api-onscene.com/partner_files/trueidintrend/17332/Outdoor-Pool-REsize-1200x800.jpg",
        text: "โรงแรม 2"
      },
      {
        id: 3,
        img: "https://www.prachachat.net/wp-content/uploads/2020/03/01-4%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%E0%B8%8A%E0%B9%88%E0%B8%A7%E0%B8%A2%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4-728x485.jpg",
        text: "โรงแรม 3"
      },
      {
        id: 4,
        img: "https://dimg04.c-ctrip.com/images/0M75112000993mw5430D3_Q60.jpg_.webp",
        text: "โรงแรม 4"
      }
      , {
        id: 5,
        img: "https://www.prachachat.net/wp-content/uploads/2020/09/17-2%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%B2%E0%B8%A3%E0%B8%B2-%E0%B8%8A%E0%B8%B0%E0%B8%AD%E0%B8%B31-728x486.jpg",
        text: "โรงแรม 5"
      },
      {
        id: 1,
        img: "https://images.trvl-media.com/lodging/16000000/15620000/15617200/15617176/248f37ce.jpg?impolicy=resizecrop&rw=500&ra=fit",
        text: "โรงแรม 1"
      },
      {
        id: 2,
        img: "https://sls-prod.api-onscene.com/partner_files/trueidintrend/17332/Outdoor-Pool-REsize-1200x800.jpg",
        text: "โรงแรม 2"
      },
      {
        id: 3,
        img: "https://www.prachachat.net/wp-content/uploads/2020/03/01-4%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%E0%B8%8A%E0%B9%88%E0%B8%A7%E0%B8%A2%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4-728x485.jpg",
        text: "โรงแรม 3"
      },
      {
        id: 4,
        img: "https://dimg04.c-ctrip.com/images/0M75112000993mw5430D3_Q60.jpg_.webp",
        text: "โรงแรม 4"
      }
      , {
        id: 5,
        img: "https://www.prachachat.net/wp-content/uploads/2020/09/17-2%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%B2%E0%B8%A3%E0%B8%B2-%E0%B8%8A%E0%B8%B0%E0%B8%AD%E0%B8%B31-728x486.jpg",
        text: "โรงแรม 5"
      },
      {
        id: 1,
        img: "https://images.trvl-media.com/lodging/16000000/15620000/15617200/15617176/248f37ce.jpg?impolicy=resizecrop&rw=500&ra=fit",
        text: "โรงแรม 1"
      },
      {
        id: 2,
        img: "https://sls-prod.api-onscene.com/partner_files/trueidintrend/17332/Outdoor-Pool-REsize-1200x800.jpg",
        text: "โรงแรม 2"
      },
      {
        id: 3,
        img: "https://www.prachachat.net/wp-content/uploads/2020/03/01-4%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%E0%B8%8A%E0%B9%88%E0%B8%A7%E0%B8%A2%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4-728x485.jpg",
        text: "โรงแรม 3"
      },
      {
        id: 4,
        img: "https://dimg04.c-ctrip.com/images/0M75112000993mw5430D3_Q60.jpg_.webp",
        text: "โรงแรม 4"
      }
      , {
        id: 5,
        img: "https://www.prachachat.net/wp-content/uploads/2020/09/17-2%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%B2%E0%B8%A3%E0%B8%B2-%E0%B8%8A%E0%B8%B0%E0%B8%AD%E0%B8%B31-728x486.jpg",
        text: "โรงแรม 5"
      }
    ],
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 4
    }
  };

  return (
    <>
      {isLoading ? (
        <Load />
      ) : (
        <>
          <div className={isLoadingpopup ? "" : "hidden"}>
            <div className="overlay">
              <div className="overlay__inner">
                <div className="overlay__content">
                  <div className="bounce">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
        </>
      )}
    </>
  )
}

export default Test