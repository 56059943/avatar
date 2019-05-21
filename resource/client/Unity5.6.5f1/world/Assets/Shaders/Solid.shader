Shader "DMCore/Root/Solid"
{
	Properties
	{
		_MainTex("Base (RGB)", 2D) = "white" {}
	}

	SubShader
	{
		Tags{ "RenderType" = "Opaque" }

		LOD 150

		Pass
		{
			Cull Off
			Lighting Off
			SetTexture[_MainTex]{ combine texture }
		}
	}
}