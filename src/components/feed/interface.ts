
export interface IPost{
    _id: string,
    author: string,
    place: string,
    description: string,
    hashtags: string,
    image: string,
    likes?: number
  
  }
  
  export interface IProps {
  //  feed: IPost[];
  }
  export interface IState {
    feed: IPost[];
  }
  