/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

const LaporanPerFakultas = ({data}) => {

  // console.log(data)

  const CardNew = ({
    fakultas,
    laporanAktif,
    laporanSelesai,
    laporanGagal,
    jmlStatus
  }) => {
    let svg;
    if (fakultas === "FAKULTAS MIPA") {
      svg = (
        <svg
          className="w-12 h-12 mb-4 text-gray-900"
          fill="#000000"
          version="1.1"
          id="Scientist"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 300 300"
          xmlSpace="preserve"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path d="M190.2,139l-17.8,37c-1.1,2.3,0.6,5,3.2,5h55.8c2.6,0,4.3-2.7,3.1-5.1L216,139h4.2c5.5,0,14.1-4.3,13.8-14 c-0.3-7.3-6.4-13-13.6-13H214v-6h4v-7h-30v7h4v6h-10V87c0-16-13-29-29-29h-14.2L127,76.6V58h-10v18.6L105.2,58H91c-16,0-29,13-29,29 v71.1c0,7.1,5.4,13.3,12.5,13.8c4.1,0.3,7.9-1.2,10.5-3.9V201h8v81.1c0,6.9,5.4,12.8,12.3,12.9c7,0.1,12.7-5.5,12.7-12.5V201h8v81.1 c0,6.9,5.4,12.8,12.3,12.9c7,0.1,12.7-5.5,12.7-12.5V201h8v-67c2.9,3.2,7,5,11.6,5H190.2z M214,120h6.4c3.1,0,5.6,2.5,5.6,5.6 c0,3.3-2.4,5.4-5.5,5.4H214V120z M199,137v-31h8v31l17,34h-7l-8-16h-18.7L199,137z M163,123.5V97h-12l0,96H93v-96L81,97v61.5 c0,3-2.5,5.5-5.5,5.5s-5.5-2.5-5.5-5.5V87c0-11.6,9.4-21,21-21h9.8L122,99.5L143.2,66h9.8c11.6,0,21,9.4,21,21v33h18v11h-21.4 C166.4,131,163,127.7,163,123.5z M197.8,80.4c0-3.9,3.2-7.1,7.1-7.1s7.1,3.2,7.1,7.1s-3.2,7.1-7.1,7.1S197.8,84.3,197.8,80.4z M215.2,63.8c0-2.5,2-4.5,4.5-4.5s4.5,2,4.5,4.5s-2,4.5-4.5,4.5S215.2,66.3,215.2,63.8z M99.1,29.3c0-12.6,10.2-22.9,22.9-22.9 c12.6,0,22.9,10.2,22.9,22.9S134.6,52.2,122,52.2S99.1,41.9,99.1,29.3z"></path>{" "}
          </g>
        </svg>
      );
    } else if (fakultas === "FAKULTAS TEKNIK") {
      svg = (
        <svg
          className="w-12 h-12 mb-4 text-gray-900"
          fill="#000000"
          version="1.1"
          id="Icons"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 32 32"
          xmlSpace="preserve"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path d="M31.7,20.9c-0.1-0.5-0.7-0.8-1.2-0.7c-0.7,0.2-1.2,0-1.3-0.2c-0.1-0.2,0-0.7,0.5-1.3c0.4-0.4,0.4-1,0-1.4 c-1-1-2.2-1.7-3.6-2.1c-0.5-0.1-1.1,0.2-1.2,0.7c-0.2,0.7-0.6,1-0.9,1s-0.6-0.4-0.9-1c-0.2-0.5-0.7-0.8-1.2-0.7 c-1.4,0.4-2.6,1.1-3.6,2.1c-0.4,0.4-0.4,1,0,1.4c0.5,0.5,0.6,1,0.5,1.3c-0.1,0.2-0.6,0.4-1.3,0.2c-0.5-0.1-1.1,0.2-1.2,0.7 C16.1,21.6,16,22.3,16,23s0.1,1.4,0.3,2.1c0.1,0.5,0.7,0.8,1.2,0.7c0.7-0.2,1.2,0,1.3,0.2c0.1,0.2,0,0.7-0.5,1.3 c-0.4,0.4-0.4,1,0,1.4c1,1,2.2,1.7,3.6,2.1c0.1,0,0.2,0,0.3,0c0.4,0,0.8-0.3,1-0.7c0.2-0.7,0.6-1,0.9-1s0.6,0.4,0.9,1 c0.2,0.5,0.7,0.8,1.2,0.7c1.4-0.4,2.6-1.1,3.6-2.1c0.4-0.4,0.4-1,0-1.4c-0.5-0.5-0.6-1-0.5-1.3c0.1-0.2,0.6-0.4,1.3-0.2 c0.5,0.1,1.1-0.2,1.2-0.7c0.2-0.7,0.3-1.4,0.3-2.1S31.9,21.6,31.7,20.9z M24,27c-2.2,0-4-1.8-4-4s1.8-4,4-4c2.2,0,4,1.8,4,4 S26.2,27,24,27z"></path>{" "}
            <path d="M14,23c0-1.2,0.2-2.3,0.6-3.3c0-0.1,0-0.1,0-0.2c0,0,0.1-0.1,0.1-0.1c0.5-1.2,1.1-2.2,1.9-3.1c0.1-0.4,0.2-0.7,0.3-1.1 c0-0.3,0-0.6-0.2-0.8S16.2,14,15.9,14c-1.1,0-2.1-0.4-2.9-1h6c0.6,0,1-0.4,1-1s-0.4-1-1-1h-0.2v-0.2c0-1.8-0.6-3.4-1.6-4.8l-0.7,2.5 c-0.1,0.4-0.5,0.7-1,0.7c-0.1,0-0.2,0-0.3,0c-0.5-0.2-0.8-0.7-0.7-1.2l1.2-4.1c0-0.3-0.2-0.6-0.5-0.8c-2.6-1.3-5.7-1.3-8.3,0 C6.5,3.1,6.4,3.5,6.3,3.8l1.2,4.1c0.2,0.5-0.2,1.1-0.7,1.2c-0.1,0-0.2,0-0.3,0c-0.4,0-0.8-0.3-1-0.7L4.9,6c-1,1.4-1.6,3-1.6,4.8V11 H3c-0.6,0-1,0.4-1,1s0.4,1,1,1h2v1c0,2.2,0.9,4.2,2.4,5.5c-0.2,1.4-1.1,2.6-2.5,3c-2.5,0.7-4.4,2.9-5,5.7c-0.1,0.5,0,0.9,0.3,1.3 C0.6,29.8,1,30,1.5,30h15.4C15.1,28.2,14,25.7,14,23z"></path>{" "}
          </g>
        </svg>
      );
    } else if (fakultas === "FAKULTAS ILMU SOSIAL dan HUKUM") {
      svg = (
        <svg
          fill="#000000"
          viewBox="0 0 50 50"
          version="1.2"
          baseProfile="tiny"
          xmlns="http://www.w3.org/2000/svg"
          overflow="inherit"
          className="w-12 h-12 mb-4 text-gray-900"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M.295 27.581c.41 3.175 3.117 5.626 6.405 5.626 3.284 0 5.989-2.451 6.4-5.626h-12.805zm34.887 12.999c0 .553-.446 1.003-.998 1.003h-18.656c-.548 0-1-.45-1-1.003 0-.549.451-.993 1-.993h18.655c.552 0 .999.444.999.993zm-20.545 1.514h20.437v2.887h-20.437zm22.263-14.513c.409 3.175 3.119 5.626 6.402 5.626 3.285 0 5.991-2.451 6.399-5.626h-12.801zm12.449-2.009l-5.243-7.222h2.803c.682 0 1.231-.559 1.231-1.25 0-.685-.55-1.238-1.231-1.238h-14.848c-.885-2.441-3.021-4.275-5.634-4.732v-3.897c0-.693-.556-1.246-1.245-1.246l-.116.013-.116-.013c-.689 0-1.243.553-1.243 1.246v3.895c-2.613.457-4.748 2.291-5.632 4.732h-14.851c-.677 0-1.229.553-1.229 1.238 0 .692.552 1.25 1.229 1.25h2.675l-5.244 7.222h-.655v1.334h13.398v-1.334h-.658l-5.242-7.22h12.169c0-.282.031-.559.073-.824.043-.125.072-.252.072-.383.458-1.93 1.966-3.463 3.895-3.933v13.697h-.052c-.107 5.152-2.558 9.645-6.194 12.17h15.214c-3.637-2.525-6.086-7.018-6.199-12.17h-.048v-13.697c1.926.47 3.439 2.003 3.894 3.933.004.131.031.258.075.383.04.266.065.542.065.824h12.042l-5.244 7.222h-.654v1.334h13.394v-1.334h-.651zm-43.184 0h-4.185l4.185-5.765v5.765zm1.071 0v-5.765l4.185 5.765h-4.185zm35.532 0h-4.187l4.187-5.765v5.765zm1.066 0v-5.765l4.19 5.765h-4.19zm-35.893-11.448c0 .679-.556 1.239-1.24 1.239-.687 0-1.245-.56-1.245-1.239 0-.686.558-1.246 1.245-1.246.684-.001 1.24.56 1.24 1.246zm36.604-.066c0 .691-.556 1.239-1.242 1.239-.689 0-1.242-.548-1.242-1.239 0-.686.553-1.245 1.242-1.245.686 0 1.242.559 1.242 1.245z"></path>
          </g>
        </svg>
      );
    } else if (fakultas === "FAKULTAS ILMU OLAHRAGA") {
      svg = (
        <svg
          fill="#000000"
          viewBox="0 0 24 24"
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 mb-4 text-gray-900"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M20.506,20.454a11.975,11.975,0,0,0,0-16.908c-.009-.01-.011-.022-.021-.031s-.021-.012-.031-.021a11.975,11.975,0,0,0-16.907,0c-.01.009-.023.012-.032.022s-.013.022-.022.032a11.975,11.975,0,0,0,0,16.906c.009.01.012.023.022.032s.022.013.032.022a11.975,11.975,0,0,0,16.907,0c.01-.009.022-.011.031-.021S20.5,20.464,20.506,20.454Zm-18.449-7.4a9.927,9.927,0,0,1,5.275,2.2l-3.07,3.07A9.951,9.951,0,0,1,2.057,13.058Zm2.2-7.382L10.586,12,8.749,13.837a11.921,11.921,0,0,0-6.7-2.784A9.956,9.956,0,0,1,4.262,5.676Zm17.681,5.266a9.935,9.935,0,0,1-5.275-2.2l3.07-3.07A9.951,9.951,0,0,1,21.943,10.942Zm-6.689-3.61a9.927,9.927,0,0,1-2.2-5.275,9.951,9.951,0,0,1,5.266,2.2ZM13.836,8.75,12,10.586,5.676,4.262a9.956,9.956,0,0,1,5.377-2.214A11.933,11.933,0,0,0,13.836,8.75Zm-5.09,7.918a9.927,9.927,0,0,1,2.2,5.275,9.951,9.951,0,0,1-5.266-2.205Zm1.417-1.417L12,13.414l6.324,6.324a9.948,9.948,0,0,1-5.377,2.214A11.921,11.921,0,0,0,10.163,15.251ZM13.414,12l1.836-1.836a11.933,11.933,0,0,0,6.7,2.783,9.956,9.956,0,0,1-2.214,5.377Z"></path>
          </g>
        </svg>
      );
    } else if (fakultas === "FAKULTAS ILMU PENDIDIKAN") {
      svg = (
        <svg
          fill="#000000"
          height="200px"
          width="200px"
          className="w-12 h-12 mb-4 text-gray-900"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512.001 512.001"
          xmlSpace="preserve"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g>
              {" "}
              <g>
                {" "}
                <path d="M495.574,57.342h-82.131L360.905,4.805c-2.113-2.112-4.977-3.298-7.964-3.298c-2.987,0-5.852,1.186-7.964,3.298 L292.44,57.342h-84.212c-6.22,0-11.262,5.042-11.262,11.262v21.663c19.01,11.54,31.277,32.316,31.392,55.238l0.019,3.826 l13.794-8.565c11.472-7.124,25.109-7.836,36.736-3.131l62.4-27.016c14.837-6.425,32.081,0.395,38.505,15.238 c6.426,14.841-0.396,32.081-15.237,38.506l-63.872,27.653c-3.203,7.128-8.491,13.413-15.631,17.846 c-9.805,6.087-62.155,38.592-72.055,44.739c-5.049,3.135-10.519,5.026-16.052,5.763v21.193c0,6.22,5.042,11.262,11.262,11.262 h287.346c6.22,0,11.262-5.042,11.262-11.262V68.605h0.001C506.837,62.385,501.794,57.342,495.574,57.342z M324.295,57.341 l28.645-28.645l28.645,28.645H324.295z"></path>{" "}
              </g>{" "}
            </g>{" "}
            <g>
              {" "}
              <g>
                {" "}
                <path d="M363.276,133.017c-2.471-5.708-9.103-8.332-14.809-5.861l-52.958,22.929c4.83,6.12,7.739,13.307,8.551,20.843 l53.356-23.101C363.123,145.357,365.748,138.726,363.276,133.017z"></path>{" "}
              </g>{" "}
            </g>{" "}
            <g>
              {" "}
              <g>
                {" "}
                <path d="M108.721,0C85.447,0,66.58,18.867,66.58,42.141c0,23.396,19.025,42.14,42.141,42.14c23.218,0,42.141-18.826,42.141-42.141 C150.862,18.867,131.994,0,108.721,0z"></path>{" "}
              </g>{" "}
            </g>{" "}
            <g>
              {" "}
              <g>
                {" "}
                <path d="M280.896,164.59c-5.924-9.539-18.458-12.473-27.999-6.549l-41.181,25.568l-0.191-38.019 c-0.133-26.399-21.719-47.875-48.118-47.875c-59.365,0-59.762,0-109.374,0c-26.399,0-47.985,21.477-48.118,47.875l-0.75,149.38 c-0.057,11.229,9.001,20.379,20.23,20.435c0.036,0,0.069,0,0.105,0c11.182,0,20.275-9.037,20.331-20.231l0.751-149.379 c0.011-2.224,1.82-4.019,4.045-4.013s4.023,1.81,4.023,4.035c0.001,48.59,0.009,319.557,0.009,341.785 c0,13.476,10.923,24.4,24.4,24.4c13.477,0,24.4-10.923,24.4-24.4v-195.03h10.536V487.6c0,13.476,10.923,24.4,24.4,24.4 s24.4-10.923,24.4-24.4c0-319.389-0.434-142.831-0.442-343.495c0-2.392,1.939-4.33,4.329-4.331 c2.392-0.001,4.332,1.936,4.333,4.328c0,0.518-0.048,1.08-0.152,1.692l0.374,74.361c0.037,7.363,4.051,14.13,10.495,17.692 c6.442,3.563,14.308,3.365,20.564-0.52l72.053-44.738C283.888,186.666,286.82,174.13,280.896,164.59z"></path>{" "}
              </g>{" "}
            </g>{" "}
          </g>
        </svg>
      );
    } else if (fakultas === "FAKULTAS BAHASA DAN SENI") {
      svg = (
        <svg
          viewBox="0 0 512 512"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          fill="#000000"
          className="w-12 h-12 mb-4 text-gray-900"

        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <title>language</title>{" "}
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              {" "}
              <g
                id="icon"
                fill="#000000"
                transform="translate(42.666667, 85.333333)"
              >
                {" "}
                <path
                  d="M426.666667,85.3333333 L426.666667,341.333333 L362.626302,341.333333 L362.666667,405.333333 L256,341.333333 L170.666667,341.333333 L170.666667,85.3333333 L426.666667,85.3333333 Z M256,1.42108547e-14 L256,64 L213.333,64 L213.333333,42.6666667 L42.6666667,42.6666667 L42.6666667,213.333333 L149.333,213.333 L149.333,268.8 L64,320 L64.0403648,256 L6.39488462e-14,256 L6.39488462e-14,1.42108547e-14 L256,1.42108547e-14 Z M384,128 L213.333333,128 L213.333333,298.666667 L384,298.666667 L384,128 Z M311.198683,149.333333 L359.616467,277.333333 L335.768901,277.333333 L322.580475,240.658669 L274.524018,240.658669 L261.425923,277.333333 L238.933333,277.333333 L286.267137,149.333333 L311.198683,149.333333 Z M298.552247,170.741943 C296.817878,176.812232 294.528512,183.826018 291.684148,191.7833 L291.325712,192.782875 L280.576241,223.134321 L316.43792,223.134321 L305.68845,192.782875 L304.747024,190.067278 C302.566831,183.717713 300.501905,177.275935 298.552247,170.741943 Z M138.364283,55.8724491 L138.363691,66.5384491 L149.332691,66.5384491 L149.334032,145.217282 C147.846623,148.082062 146.253419,150.895209 144.554383,153.656286 C146.072758,154.996689 147.66531,156.330498 149.332056,157.657476 L149.332744,183.9067 C142.782625,179.623374 136.879514,175.218148 131.623873,170.685181 C117.063661,186.063317 97.230366,196.963418 72.3795207,203.419113 L66.0115407,204.951778 L61.383691,184.126454 C85.6428706,178.735525 103.970928,169.143885 116.711981,155.39526 C105.111587,141.185042 96.9168733,125.119906 92.1670974,107.291622 L90.6021236,100.779065 L111.459775,96.2991661 C114.703867,111.403107 120.706878,124.963276 129.507523,137.067333 C137.440289,122.406679 142.049701,106.041819 143.329049,87.8734181 L63.6976158,87.8724491 L63.6976158,66.5391157 L117.030691,66.5384491 L117.030949,55.8724491 L138.364283,55.8724491 Z"
                  id="Combined-Shape"
                >
                  {" "}
                </path>{" "}
              </g>{" "}
            </g>{" "}
          </g>
        </svg>
      );
    }

    return (
      <div className="relative min-w-52 flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
        <div className="p-6">
          {svg}
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {fakultas === "" ? "contoh fakultas" : fakultas}
          </h5>
          {/* <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
            <span className="font-bold">{laporanAktif + " "}</span>
            Laporan aktif
            <br />
            <span className="font-bold">{laporanSelesai}</span> Laporan selesai
            <br />
            <span className="font-bold">{laporanGagal + " "}</span>
            Laporan Gagal
          </p> */}
          {
              jmlStatus.map((item, index) => {
                return (
                  <div key={index}>
                    <span className="font-bold">{item.count + " "}</span>
                    {item.status}
                  </div>
                );
              })
            }
        </div>
        {/* <div className="p-6 pt-0">
        <a href="#" className="inline-block">
          <button
            className="flex items-center gap-2 px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
            type="button"
          >
            Learn More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              ></path>
            </svg>
          </button>
        </a>
      </div> */}
      </div>
    );
  };

  const Card = ({
    fakultas,
    laporanAktif,
    laporanSelesai,
    laporanGagal,
    jmlStatus,
    image = "https://www.bankrate.com/2014/05/26174958/Reasons-to-go-to-college.jpg?auto=webp&optimize=high&crop=16:9&width=912",
  }) => {

    console.log({jmlStatus})
    return (
      <div className="min-w-52 w-52 bg-white border border-gray-200 rounded-lg shadow mb-20 ">
        <a href="#">
          <img className="rounded-t-lg" src={image} alt="fakultas" />
        </a>
        <div className="px-5 py-2">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
              {fakultas}
              <hr />
            </h5>
          </a>
          <p className=" font-normal text-gray-700 ">
            <span className="font-bold">{laporanAktif + " "}</span>
            Laporan aktif
            <br />
            <span className="font-bold">{laporanSelesai}</span> Laporan selesai
            <br />
            <span className="font-bold">{laporanGagal + " "}</span>
            Laporan Gagal
            {
              jmlStatus.map((item, index) => {
                return (
                  <div key={index}>
                    <span className="font-bold">{item.count + " "}</span>
                    {item.status}
                  </div>
                );
              })
            }
          </p>
        </div>
      </div>
    );
  };

  {
    /* fakultas teknik, fakultas ekonomi, fakultas matematika dan ilmu pengetahuan alam, fakultas ilmu sosial dan hukum, fakultas ilmu olahraga, fakultas ilmu pendidikan, dan fakultas bahasa dan seni, serta pascasarjana */
  }
  return (
    <section className="px-7 flex gap-10 box-border items-center mb-5 overflow-scroll md:mx-20 pb-10">
      {
        data ? data.data.laporan_per_fakultas_dan_status.map((item, index) => {
          return <CardNew
            key={index}
            fakultas={item.fakultas}
            jmlStatus={item.status_counts}
            // laporanSelesai={item.laporan_selesai}
            // laporanGagal={item.laporan_gagal}
          />
        }) : null
      }
      {/* <CardNew
        fakultas={"FAKULTAS TEKNIK"}
        laporanAktif={10}
        laporanSelesai={5}
        laporanGagal={2}
      />
      <CardNew
        fakultas={"FAKULTAS MIPA"}
        laporanAktif={10}
        laporanSelesai={5}
        laporanGagal={2}
      />
      <CardNew
        fakultas={"FAKULTAS ILMU SOSIAL dan HUKUM"}
        laporanAktif={10}
        laporanSelesai={5}
        laporanGagal={2}
      />
      <CardNew
        fakultas={"FAKULTAS ILMU OLAHRAGA"}
        laporanAktif={10}
        laporanSelesai={5}
        laporanGagal={2}
      />
      <CardNew
        fakultas={"FAKULTAS ILMU PENDIDIKAN"}
        laporanAktif={10}
        laporanSelesai={5}
        laporanGagal={2}
      />
      <CardNew
        fakultas={"FAKULTAS BAHASA DAN SENI"}
        laporanAktif={10}
        laporanSelesai={5}
        laporanGagal={2}
      /> */}
    </section>
  );
};

export default LaporanPerFakultas;
