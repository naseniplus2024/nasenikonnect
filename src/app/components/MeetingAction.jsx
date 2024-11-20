"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Copy, Link2, LinkIcon, Plus, Video } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid';
import Loader from './Loader'

const MeetingAction = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [baseUrl, setBaseUrl] = useState("")
  const router = useRouter()
  const [generatedMeetingUrl, setGeneratedMeetingUrl] = useState("")
  const [meetingLink, setMeetingLink] = useState("")

  useEffect(() => {
    setBaseUrl(window.location.origin)
  }, [])

  const handleCreateMeetingForLater = () => {
    const roomId = uuidv4();
    const url = `${baseUrl}/video-meeting/${roomId}`
    setGeneratedMeetingUrl(url)
    setIsDialogOpen(true)
    toast.success("Meeting link was created successfully")
  }

  const handleJoinMeeting = () => {
    if (meetingLink) {
      setIsLoading(true)
      const formattedLink = meetingLink.includes("http")
        ? meetingLink
        : `${baseUrl}/video-meeting/${meetingLink}`
      router.push(formattedLink)
      toast.info('Joining meeting now...')
    } else {
      toast.error('Please enter the correct link or code')
    }
  }

  const handleStartMeeting = () => {
    setIsLoading(true)
    const roomId = uuidv4()
    const meetingUrl = `${baseUrl}/video-meeting/${roomId}`
    router.push(meetingUrl)
    toast.info('Joining meeting...')
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedMeetingUrl)
    toast.info('Meeting link copied to clipboard successfully')
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:bg-indigo-700 shadow-md rounded-lg py-3 flex items-center justify-center">
              <Video className='w-5 h-5 mr-2' />
              Host a New Meeting
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 p-2 bg-white shadow-lg rounded-lg border border-gray-200">
            <DropdownMenuItem onClick={handleCreateMeetingForLater} className="text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center space-x-2 py-2">
              <Link2 className='w-4 h-4 text-gray-500' />
              <span>Schedule Meeting</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleStartMeeting} className="text-sm text-white-700 hover:bg-gray-100 rounded-md flex items-center space-x-2 py-2">
              <Plus className='w-4 h-4 text-gray-500' />
              <span>Launch New Meeting</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className='flex w-full sm:w-auto relative'>
          <span className='absolute left-2 top-1/2 transform -translate-y-1/2'>
            <LinkIcon className='w-4 h-4 text-gray-400' />
          </span>
          <Input
            placeholder='Enter a code or link'
            className="pl-8 rounded-r-none pr-10 border-2 border-gray-300 shadow-sm focus:border-indigo-600"
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
          />
          <Button
            variant="secondary"
            className="rounded-l-none bg-gradient-to-r from-blue-400 to-indigo-500 hover:bg-indigo-600 text-white"
            onClick={handleJoinMeeting}
          >
            Join
          </Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-sm rounded-lg p-6 bg-white shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-3xl font-semibold text-red-900">
              Your Meeting Details
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            <p className='text-sm text-gray-600'>
              Share this with anyone you want to invite to the meeting. Be sure to save it for future use.
            </p>
            <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
              <span className="text-gray-700 break-all">{generatedMeetingUrl.slice(0, 30)}...</span>
              <Button variant="ghost" className="hover:bg-gray-200" onClick={copyToClipboard}>
                <Copy className="w-5 h-5 text-orange-500" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default MeetingAction
