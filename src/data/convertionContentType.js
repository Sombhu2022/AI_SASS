import { MdChat } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa";
import { IoDocumentOutline } from "react-icons/io5";
import { MdOutlineTopic } from "react-icons/md";
export const contentTypeData = [
    {
        type:"Chat",
        link:'chat',
        icon:<MdChat/>,
        iconBg:"bg-blue-600/10",
        iconColor:"text-blue-600",
        description:"this is simple chat model , you give simple prompt and Ai can be genarate a text for you base on your requirement",
        aiPrompt:[],
        formData:[
            {
                name:"prompt",
                placeholder:"Enter Prompt base your requirment... ",
                required: true
            }
        ]
    } ,
    {
        type:"Project Idea Genarate",
        link:'project-idea-gen',
        icon:<FaRegLightbulb/>,
        iconBg:"bg-pink-600/10",
        iconColor:"text-pink-600",
        description:"this is simple chat model , you give simple prompt and Ai can be genarate a text for you base on your requirement",
        aiPrompt:[],
        formData:[
            {
                name:"prompt",
                placeholder:"Enter Prompt base your requirment... ",
                required: true
            }
        ]
    },
    {
        type:"Project Documentation",
        link:'project-doc',
        icon:<IoDocumentOutline/>,
        iconBg:"bg-purple-600/10",
        iconColor:"text-purple-600",
        description:"Genarate Project Document or How to make your Project Base on Your Idea , provite name , goal , using technology of your project , write clear prompt for best exprience  ",
        aiPrompt:["Genarate a documentation for this project idea and add more information and flowchar as a editor formate not use image of flowchar or diagram " , "how to make this project base on my idea" ],
        formData:[
            // {
            //     name:"name",
            //     placeholder:"Project Name",
            //     required: false
            // },
            // {
            //     name:"target-user",
            //     placeholder:"Target User",
            //     required:false

            // },
            // {
            //     name:"technology",
            //     placeholder:" Using Technology",
            //     require: false
            // },
            {
                name:"prompt",
                placeholder:"Write project name , target users , using technology , project goal , project details (Required) ",
                required:true
            }
        ]
    },
    {
        type:"Any Topic Documentation",
        link:'topic-doc',
        icon:<MdOutlineTopic/>,
        iconBg:"bg-green-600/10",
        iconColor:"text-green-600",
        description:"This is actuall use for your reserch pappose , in this section write quary for any topic , and genarate document base on your requirement .",
        aiPrompt:["describe more details on this given topic and highlight most importent points" , "please provite more refarance and links (not describe this point)"],
        formData:[
            {
                name:"prompt",
                placeholder:"Enter your Quary... ",
                required: true
            }
        ]

    }
   
]