half LayaOcclusion(float2 uv)
{
	half occ = tex2D(_OcclusionMap, uv).g;
	return LerpOneTo (occ, _OcclusionStrength);
}

half3 LayaUnpackScaleNormal(half4 packednormal, half bumpScale)
{
    half3 normal;
    normal.xy = (packednormal.wy * 2 - 1);
	normal.xy *= bumpScale;
    normal.z = sqrt(1.0 - saturate(dot(normal.xy, normal.xy)));
    return normal;
}

half2 LayaParallaxOffset(half h, half height, half3 viewDir )
{
    h = h * height - height/2.0;
    half3 v = normalize(viewDir);
    v.z += 0.42;
    return h * (v.xy / v.z);
}