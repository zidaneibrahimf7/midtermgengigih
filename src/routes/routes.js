import express from 'express'
import videoListModels from '../models/videoListModels.js';
import productListModels from '../models/productListModels.js';
import commentListModels from '../models/commentListModels.js';

const videoListRouter = express.Router();
const productListRouter = express.Router();
const commentListRouter = express.Router();

//getVideoList Video Thumbnail List API
videoListRouter.get('/', async (req, res) => {
  try {
    const videoList = await videoListModels.find();
    res
      .json(videoList)
      .status(200)
  }
  catch (e) {
    res.status(404).json({ message: "Videos not found" })
  }
})

//PostVideoList to Add Video Thumbnail List API into Database
videoListRouter.post('/post-video', async (req, res) => {
  const { videoTitle, videoID, urlImg } = req.body

  try {
    //check if a videoList is same in database
    const existingvideoList = await videoListModels.findOne({ videoID, urlImg });
    if (existingvideoList) {
      return res.status(409).json({ error: 'your video list is same, please add another video' });
    }
    const videoList = await new videoListModels({
      videoTitle,
      videoID,
      urlImg,
    }).save()
    res.status(201).json({ videoList })
  }
  catch (e) {
    console.error(e)
    res.status(400).json({ message: 'invalid state' })
  }
})

//Method GET ProductList to get Product List Database
productListRouter.get('/:videoID', async (req, res) => {
  const { videoID } = req.params
  try {
    const video = await videoListModels.findOne({ videoID })

    if (!video) {
      return res.status(404).json({ message: 'video ID not found in database!' })
    }

    const productList = await productListModels.find({ videoID });
    res.json(productList).status(200);
  }
  catch (e) {
    res.status(500).json({ message: 'internal server error' })
  }
});

// METHOD POST ProductList to Add Product List to Database
productListRouter.post('/post-product', async (req, res) => {
  // const {videoID} = req.params;
  const { videoID, productID, linkProduct, title, price } = req.body;

  try {
    //check if a product is same in database
    const existingproductList = await productListModels.findOne({ videoID, productID, linkProduct, title, price });
    if (existingproductList) {
      return res.status(409).json({ error: 'your product list has added before' });
    }

    const productList = await new productListModels({
      videoID,
      productID,
      linkProduct,
      title,
      price,
    }).save()
    res.status(200).json(productList)
  }
  catch (e) {
    console.error(e)
    res.status(500).json({ message: 'internal server error' })
  }
})

// METHOD PUT ProductList to update the data of Product List
productListRouter.put('/update/:productID', async (req, res) => {
  const { productID } = req.params;

  const { linkProduct, title, price } = req.body;

  try {
    const existingproductList = await productListModels.findOne({ linkProduct, title, price })
    if (existingproductList) {
      return res.status(409).json({ message: 'your product list has been updated' })
    }
    const updatedProduct = await productListModels.findOneAndUpdate(
      { productID },
      { linkProduct, title, price },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  }
  catch (e) {
    console.error(e)
    res.status(500).json({ message: "Internal server error" });
  }
})

// METHOD DELETE ProductList to delete Product List
productListRouter.delete('/delete/:productID', async (req, res) => {
  const { productID } = req.params;

  try {
    const existingProductList = await productListModels.findOne({ productID })

    if (!existingProductList) {
      return res.status(404).json({ message: 'Product not found in the database' });
    }

    //delete product from database
    await productListModels.findOneAndDelete({ productID })
    res.status(200).json({ message: 'Product List has been deleted' })
  }
  catch (e) {
    console.log('Error:', e);
    res.status(500).json({ error: 'internal server error' })
  }
});


// METHOD GET CommentList to get Comment List in Database
commentListRouter.get('/:videoID', async (req, res) => {
  const { videoID } = req.params

  try {
    const video = await videoListModels.findOne({ videoID })

    if (!video) {
      return res.status(404).json({ message: 'video ID not found in database!' })
    }

    const commentList = await commentListModels.find({ videoID })
    res
      .status(200)
      .json(commentList)
  }

  catch (e) {
    res.status(500).send({ message: 'internal server error' })
  }
});

// Method POST Submit Comment
commentListRouter.post('/submit-comment', async (req, res) => {
  const { username, comment, videoID } = req.body;
  try {
    //check if a comment is same in database
    const existingCommentList = await commentListModels.findOne({ videoID, username, comment })
    if (existingCommentList) {
      return res.status(409).json({ response: 'Fail', message: 'Your comment is added before' })
    }
    const commentList = await commentListModels({
      videoID,
      username,
      comment,
      timestamp: Date.now()
    }).save()

    res.status(200).json({ commentList, response: 'Success' })
  }
  catch (e) {
    console.log(e);
    res.status(500).json({ response: 'Fail', message: "Internal server error" })
  }
})




export { videoListRouter, productListRouter, commentListRouter };