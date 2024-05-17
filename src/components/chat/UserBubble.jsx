/* eslint-disable react/prop-types */

const UserBubble = ({ message, seen, image }) => {
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg ">
      <div className="flex items-center justify-start flex-row-reverse md:max-w-md">
        <div className="items-center justify-center h-10 w-10 rounded-full bg-orange-500 flex-shrink-0 hidden md:flex">
          U
        </div>

        <div className="relative mr-3 text-sm bg-orange-100 py-2 px-4 shadow rounded-xl">
          {image ? (
            <img
              src={image}
              alt="image-from-user"
              className="mb-2 w-[448px] h-44 object-cover"
            />
          ) : null}

          <div>{message}</div>
          {seen && (
            <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
              Seen
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserBubble;
