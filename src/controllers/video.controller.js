import mongoose, {isValidObjectId} from "mongoose"
import { Video } from "../models/video.model"
import { User } from "../models/user.model"
import { ApiResponse } from "../utils/ApiResponse"
import { ApiError } from "../utils/ApiError"
import { asyncHandler } from "../utils/asyncHandler"
import { uploadOnCloudinary } from "../utils/cloudinary"

const getAllVideos = asyncHandler(async( req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
  // TODO: get all videos based on query, sort, pagination.
}) 

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description} = req.body
  // TODO: get video, upload to cloudinary, create video

  //Check for title and description
  //video and thumnail localfilepath
  //Upload on cloudinary
  //Creat video


  if (!(title && description)) {
    throw new ApiError(400, "Provide a valid video thumbnail and description")
  }

  const videoLocalPath = req.files?.video[0]?.path
  const thumnailLocalPath = req.files?.thumbnail[0]?.path

  if (!videoLocalPath) {
    throw new ApiError(400, "Video file is missing")
  }

  if (!thumnailLocalPath) {
    throw new ApiError(400, "Thumbnail is missing")
  }

  const videoFile = await uploadOnCloudinary(videoLocalPath)
  const thumnail = await uploadOnCloudinary(thumnailLocalPath)

  const uploadVideo = await Video.create({
    title, 
    description,
    videoFile : videoFile.url,
    thumnail : thumnail.url,
    owner : req.user?._id,
    duration : videoFile.duration
  })

  if (!uploadVideo) {
    throw new ApiError(
      500,
      "Unable to upload video. Please try again later"
    )
  }

  return res
  .status(200)
  .json(
    new ApiResponse(200,uploadVideo ,"Video published successfully" )
)
})

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params
  //TODO: get video by id

  const video = await Video.findById(videoId)
  if (!video) {
    throw new ApiError(404, "Video not found")
    }
    return res
    .status(200)
    .json( 
      new ApiResponse(200, "Video found successfully", video)
      )

})

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params
  //TODO: update video details like title, description, thumbnail
  // take title, description and thubnail from req.body and check if it is present or not and then set it using $set operator of mongodb.

  
})

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params
  //TODO: delete video
})

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params
})

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus
}