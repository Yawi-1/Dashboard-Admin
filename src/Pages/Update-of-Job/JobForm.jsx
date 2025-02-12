import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addJob } from "../../Redux/Actions/jobAction";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Spinner from "../../Components/Spinner/Spinner";

const JobForm = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.jobs);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [jobType, setJobType] = useState("");
  const [lastDate, setLastDate] = useState("");
  
  const titleRef = useRef();
  const descriptionRef = useRef();
  const skillsRef = useRef();
  const jobTypeRef = useRef();
  const lastDateRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!title.trim()) {
        toast.info("Job title is required.");
        titleRef.current.focus();
        return;
      }
      if (!description.trim()) {
        toast.info("Job description is required.");
        descriptionRef.current.focus();
        return;
      }
      if (!skills.trim()) {
        toast.info("Skills are required.");
        skillsRef.current.focus();
        return;
      }
      if (!jobType.trim()) {
        toast.info("Job type is required.");
        jobTypeRef.current.focus();
        return;
      }
      if (!lastDate.trim()) {
        toast.info("Last date to apply is required.");
        lastDateRef.current.focus();
        return;
      }
      
      const jobData = {
        title: title.trim(),
        description: description.trim(),
        skills: skills.split(",").map((skill) => skill.trim()),
        jobType: jobType.trim(),
        lastDate: new Date(lastDate),
      };
      
      const result = await dispatch(addJob(jobData));
      
      if (addJob.rejected.match(result)) {
        throw new Error(result.payload || "Failed to create a new job.");
      }
       console.log(result)
      toast.success("Successfully posted the job!");
      setTitle("");
      setDescription("");
      setSkills("");
      setJobType("");
      setLastDate("");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="flex flex-row items-center justify-between p-6">
        <h2 className="text-2xl font-semibold flex items-center">
          <Settings className="w-6 h-6 mr-2 ml-4 text-yellow-600" />
          Job Postings
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-1/2 mx-auto p-6 rounded shadow shadow-yellow-400"
      >
        <h1 className="text-2xl font-semibold text-center my-2">Post a Job</h1>
        <hr className="w-1/2 mx-auto border border-yellow-400" />

        <div className="mb-4">
          <label className="block my-2 text-lg font-semibold text-gray-700">Title</label>
          <input
            type="text"
            ref={titleRef}
            className="w-full p-3 rounded-md border-2 outline-none focus:border-yellow-400 border-gray-400"
            placeholder="Enter job title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block my-2 text-lg font-semibold text-gray-700">Description</label>
          <textarea
            ref={descriptionRef}
            className="w-full p-3 rounded-md border-2 outline-none focus:border-yellow-400 border-gray-400"
            placeholder="Enter job description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block my-2 text-lg font-semibold text-gray-700">Skills (comma-separated)</label>
          <input
            type="text"
            ref={skillsRef}
            className="w-full p-3 rounded-md border-2 outline-none focus:border-yellow-400 border-gray-400"
            placeholder="e.g. JavaScript, React, Node.js"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block my-2 text-lg font-semibold text-gray-700">Job Type</label>
          <input
            type="text"
            ref={jobTypeRef}
            className="w-full p-3 rounded-md border-2 outline-none focus:border-yellow-400 border-gray-400"
            placeholder="e.g. Full-time, Part-time, Remote"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block my-2 text-lg font-semibold text-gray-700">Last Date to Apply</label>
          <input
            type="date"
            ref={lastDateRef}
            className="w-full p-3 rounded-md border-2 outline-none focus:border-yellow-400 border-gray-400"
            value={lastDate}
            onChange={(e) => setLastDate(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-center font-semibold p-2">
          <button
            type="submit"
            className="w-36 my-4 p-3 hover:bg-yellow-500 bg-yellow-400 text-white rounded-md border text-center"
            disabled={status === "loading"}
          >
            {status !== "loading" ? "Post Job" : "Loading..."}
          </button>

          <Link
            to="/Job"
            className="text-center p-3 bg-blue-600 rounded-md hover:bg-blue-500 text-white"
          >
            Go Back
          </Link>
        </div>
      </form>
      {status === "loading" && <Spinner />}
    </div>
  );
};

export default JobForm;
